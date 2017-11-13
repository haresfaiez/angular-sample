import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Configuration } from 'app/configuration';

import { DefaultFactory
	 , flat
	 , Raw
	 , Uri
	 , name
	 , owner
	 , description
	 , grantCommand
	 , fragment
	 , Stale
	 , CreationForbid
	 , CreationSuccess } from 'app/share/model/data.type'

import { ShareContainer }    from 'app/share/share.container';

@Injectable()
export class ShareService {

  headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })

  private serverUrl: string;

  constructor(private proxy: Http, configuration: Configuration) {
    this.serverUrl = configuration.server.url;
  }

  push(base: ShareContainer) {
    return (input: any) => {
      let notifySuccess = (aResponse: Response) =>
        base.notification.push(CreationSuccess)

      let acknowledgeFailure = (aResponse: Response) =>
        base.error.push(CreationForbid)

      let aNewShare = {
        name: input.name
        , owner: input.owner
        , scope: base.input.scope
        , equity: fragment(base.input.equity)
      }

      this.proxy.put(`${this.serverUrl}share/${aNewShare.owner}/${name(aNewShare)}`
        , grantCommand(aNewShare)
        , new RequestOptions({ headers: this.headers }))
        .subscribe(notifySuccess, acknowledgeFailure);
    }
  }

  pull(inside: ShareContainer) {
    return (aPotentialShare: Uri) => {
      let flatten = (aResponse: Response) =>
        inside.subject = flat(<Raw>JSON.parse(aResponse.text()))

      let askForCreation = (_: Response) => inside.subject = DefaultFactory

      let target = `${this.serverUrl}share/${owner(aPotentialShare)}/${name(aPotentialShare)}`;
      this.proxy.get(target, new RequestOptions({ headers: this.headers }))
        .subscribe(flatten, askForCreation);
    }
  }
	  distribute(scope: string, target: string, owner: string) {
			let theDistribution = {
				target: target
				, scope: scope
			}
	    this.proxy.post(`${this.serverUrl}share/distribution/${owner}/${scope}`
	      , theDistribution
	      , new RequestOptions({ headers: this.headers }))
	      .subscribe((_: any) => { }, (_: any) => { })
	  }
}
