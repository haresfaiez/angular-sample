import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Configuration }  from 'app/configuration';

import * as Fund from './model/data.type';
import { Description } from './model/description';

import * as Opportunity  from 'app/opportunity/model/data.type';
import { FundContainer } from 'app/fund/fund.container';
import { OpportunityContainer } from 'app/opportunity/opportunity.container';

@Injectable()
export class FundService {

  static headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })

  private serverUrl: string;

  constructor(private proxy: Http, configuration: Configuration) {
    this.serverUrl = configuration.server.url;
  }

  describe(aResponse: Opportunity.Response): Promise<Opportunity.Raw> {
    return new Promise((resolve: any, reject: any) => {

      let _return = (raw: Response) => {
        let retrieve = JSON.parse(raw.text())
        let result = Opportunity.flat(retrieve, aResponse.scope)
        return resolve(result)
      }

      let fail = (result: Response) => reject(result)

      let target = `${this.serverUrl}opportunity/${aResponse.name}`;
      this.proxy.get(target, this.requestOptions())
        .subscribe(_return, fail);
    });
  }

  private fetchFund(aFund: Fund.Uri) {
    return new Promise((resolve: any, reject: any) => {
      let describe = (each: Opportunity.Response) => this.describe(each);

      let flatten = (aResponse: Response) => {
        let parse = JSON.parse(aResponse.text())
        let _return = (result: any) => { return resolve(result) }

        Promise.all(parse.opportunities.map(describe)).then(_return)
      }

      this.proxy
        .get(`${this.serverUrl}fund/${Fund.identity(aFund).address}`)
        .subscribe(flatten);
    })
  }

  pullFund(inside: FundContainer<any>) {
    let describe = (each: Opportunity.Response) => this.describe(each);

    let flattenOpportunities = (parse: any) =>
      Promise.all(parse.map(describe))
        .then((result: Opportunity.Raw[]) =>
          inside.opportunities = Opportunity.split(result))

    return (aFund: Fund.Uri) => new Promise((resolve: any, reject: any) => {
      let fetch = (raw: Response) => {
        let aResponse = JSON.parse(raw.text())

        let result = flattenOpportunities(aResponse.opportunities)
          .then((_: any) => {
            inside.name = aResponse.meta.name
            inside.target = aResponse.meta.target
          })
        resolve(result)
      }

      this.proxy
        .get(`${this.serverUrl}fund/${Fund.identity(aFund).address}`)
        .subscribe(fetch);
    })
  }

  createFund(aDescription: Description): Promise<Fund.Identity> {
    return new Promise((resolve: any, reject: any) => {
      let notifySuccess = (aResponse: Response) => {
        resolve(JSON.parse(aResponse.text()));
      }

      this.proxy
        .post(`${this.serverUrl}fund/`
		      , aDescription
		      , new RequestOptions({ headers: FundService.headers }))
        .subscribe(notifySuccess);
    });
  }

  pushOpportunityFrom(flat: any) {
    return flat
      .stale()
      .then((it: Opportunity.Stale) => this.pushOpportunity(it));
  }

  pushOpportunity(aNewOpportunity: Opportunity.Stale) {
    return (flat: FundContainer<any>) => {
      let notifySuccess = (aResponse: Response) =>
        flat.notification.push(Opportunity.OpportunityCreated)

      let acknowledgeFailure = (aResponse: Response) =>
        flat.error.push(Opportunity.OpportunityAlreadyExists)

      let target = `${this.serverUrl}fund/${aNewOpportunity.fund}/${aNewOpportunity.name}`;
      this.proxy.put(target
        , Opportunity.opportunityDescription(aNewOpportunity)
        , this.requestOptions())
        .subscribe(notifySuccess, acknowledgeFailure);
    };
  }

  pullOpportunity(inside: any) {
    return (aPotentialOpportunity: Opportunity.Uri) => {

      let flatten = (aResponse: Response) => {
        let body = JSON.parse(aResponse.text());
        let value = Opportunity.flat(body, aPotentialOpportunity.fund);
        inside.subject = value;

        if (body.history) inside.journal = body.history
      }

      let showCause = (aResponse: Response) => {
        let body: Fund.Error = JSON.parse(aResponse.text());
        inside.error.push(body)
      }

      let target = `${this.serverUrl}opportunity/${aPotentialOpportunity.opportunity}`;
      this.proxy.get(target, this.requestOptions())
        .subscribe(flatten, showCause);
    }
  }

  private requestOptions() {
    return new RequestOptions({ headers: FundService.headers });
  }

  upgrade(anOpportunity: Opportunity.Identity & Fund.Identity) {
    this.proxy.post(`${this.serverUrl}fund/${anOpportunity.address}/${anOpportunity.name}`, this.requestOptions())
      .subscribe((_: any) => { }, (_: any) => { })
  }

  update(anOpportunity: Opportunity.Name
    , theUpdate: Opportunity.Update
    , theScope?: string) {
    this.proxy.post(`${this.serverUrl}fund/update/${theScope}/${anOpportunity}`
      , theUpdate
      , this.requestOptions())
      .subscribe((_: any) => { }, (_: any) => { })

    console.log(`Upgrading ${JSON.stringify(anOpportunity)} with ${JSON.stringify(theUpdate)}`);
  }
}
