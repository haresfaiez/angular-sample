import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { FundService } from 'app/fund/fund.service';

import { Flat, name } from 'app/opportunity/model/data.type';

@Component({
    selector: 'opportunity-card'
    , templateUrl: './opportunity.card.view.html'
})
export class OpportunityCardComponent implements OnInit {

    @Input() opportunity: Flat;

    constructor(private service: FundService, private route: ActivatedRoute) { }

    ngOnInit(): void { }

    upgrade() {
	let command = (theFund: any) => {
	    let theOpportunity = { name: name(this.opportunity), address: theFund.name }
	    this.service.upgrade(theOpportunity);
	}

	this.route.params.subscribe(command);
    }

}
