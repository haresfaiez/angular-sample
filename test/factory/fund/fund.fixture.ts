import { ActivatedRoute } from '@angular/router';

import { declarations as moduleDeclarations } from 'app/share/share.module';

import { FundService }          from 'app/fund/fund.service';

export function someFund() {
    return { identity : 'abc'
	     , asset  : { name: 'xyz' }
	     , initiation: <string>null
	     , initiator : ''
	   };
}

export function aUriIdentity() {
    return { name: 'abcd' };
}

export const configuration = (aService: FundService, aRoute: any) => {
    let providers = [ { provide: FundService, useValue: aService }
		      , { provide: ActivatedRoute, useValue: aRoute } ]

    return { declarations: moduleDeclarations, providers: providers };
}
