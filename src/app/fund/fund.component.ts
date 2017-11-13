import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FundService   }      from './fund.service';
import { Identity, UriLabel } from './model/data.type';
import { Description }        from './model/description';

export const descriptionFrom  = (input: any): Description => {
    let result = { name: input.name
		   , target: [ input.firstTarget
			       , input.secondTarget
			       , input.thirdTarget ] }
    result.target = result.target
	.filter((each: string) => ''        !== each)
	.filter((each: string) => undefined !== each)
	.filter((each: string) => null      !== each)
    return result
}

@Component({
    templateUrl: './fund.view.html'
})
export class FundComponent {
    name        : string;
    firstTarget : string;
    secondTarget: string;
    thirdTarget : string;

    constructor(private service: FundService, private router: Router) { }

    createFund() {
	let redirectoToFlatFund = (itsIdentity: Identity) => 
		  this.router.navigate([ `/fund/${itsIdentity.address}` ])
		 
	this.service
	    .createFund(descriptionFrom(this))
	    .then(redirectoToFlatFund);
    }
}
