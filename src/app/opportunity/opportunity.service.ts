import { Injectable }                              from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Configuration } from 'app/configuration';

import * as Opportunity  from './model/data.type';

@Injectable()
export class OpportunityService {

    static headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })

    private serverUrl: string;

    constructor(private proxy: Http, configuration: Configuration) {
	this.serverUrl = configuration.server.url;
    }
}
