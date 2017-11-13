import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Configuration } from 'app/configuration';


@Injectable()
export class IdentityService {

  headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })

  private serverUrl: string;

  constructor(private proxy: Http, configuration: Configuration) {
    this.serverUrl = configuration.server.url;
  }
  pull(inside: any) {
    let flatten = (aResponse: Response) =>
      inside.current = JSON.parse(aResponse.text())

    let askForCreation = (_: Response) => inside.current = { name: '' }

    this.proxy.get(`${this.serverUrl}identity`, new RequestOptions({ headers: this.headers }))
      .subscribe(flatten, askForCreation);
  }
  fetch() {
    return new Promise((resolve: any, reject: any) => {
      let flatten = (aResponse: Response) => resolve(JSON.parse(aResponse.text()))

      let askForCreation = (cause: Response) => reject(cause)

      this.proxy.get(`${this.serverUrl}identity`, new RequestOptions({ headers: this.headers }))
        .subscribe(flatten, askForCreation);
    })

  }
  udpate(theUpdate: any) {
    return new Promise((resolve: any, reject: any) => {
      let notifySuccess = (using: any) => resolve(using)

      let acknowledgeFailure = (cause: any) => reject(cause)

      this.proxy.post(`${this.serverUrl}identity`
        , theUpdate
        , new RequestOptions({ headers: this.headers }))
        .subscribe(notifySuccess, acknowledgeFailure);

    })
  }
}
