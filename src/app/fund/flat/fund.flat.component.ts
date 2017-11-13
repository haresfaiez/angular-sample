import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { FundService } from 'app/fund/fund.service';

import { Split
	 , NullSplit
	 , NullStale
	 , Stale
	 , Notification
	 , Error } from 'app/opportunity/model/data.type';

import { aGuid, Uri } from 'app/fund/model/data.type';

@Component({
    templateUrl: './fund.flat.view.html'
})
export class FundFlatComponent implements OnInit {

    opportunities: Split;
    name         : string;
    target       : string[];
    notification : Notification[];
    error        : Error[];

    constructor(private service: FundService, private route: ActivatedRoute) {
	this.opportunities = NullSplit
	this.notification  = []
	this.error         = []
	this.name          = ''
    }

    askForOpportunity() {
	this.service
	    .pushOpportunityFrom(this)
	    .then((post: any) => post(this));
    }

    stale(): Promise<Stale> {
	let aGuidGenerator = { guid: aGuid }
	return this.effectiveStale(aGuidGenerator);
    }

    effectiveStale(aGuidGenerator: { guid: () => string }): Promise<Stale> {
	return new Promise((resolve:any, reject: any) => {
	    this.route.params.subscribe((input: Uri) => {
		let result  = NullStale;
		result.name = aGuidGenerator.guid();
		result.fund = input.name;
		resolve(result);
	    })
	})
    }

    ngOnInit(): void {
	this.route.params.subscribe(this.service.pullFund(this));
    }
}
