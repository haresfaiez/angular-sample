import { Params }       from '@angular/router';

import { Uri     }        from 'app/share/model/data.type';
import { Uri as FundUri } from 'app/fund/model/data.type';
import { FlatUri as OpportunityUri } from 'app/opportunity/model/data.type';
import { Flat as FlatShare } from 'app/share/model/data.type';

export function withShareIdentified(aShare: Uri) {
    return { params:
	     { subscribe: (callback: (_: Params) => void) => callback(aShare)}
	   };
}
export function withShare(aShare: FlatShare) {
    let uri = { name: aShare.asset.name, owner: 'aDisgtributorAddress' };
    return { params:
	     { subscribe: (callback: (_: Params) => void) => callback(uri)}
	   };
}

export function withOpportunity(anOpportunity: OpportunityUri) {
    return { params:
	     { subscribe: (callback: (_: Params) => void) => callback(anOpportunity)}
	   };
}

export function withFund(aFund: FundUri) {
    return { params:
	     { subscribe: (callback: (_: Params) => void) => callback(aFund)}
	   };
}

export function empty() {
    return { params:
	     { subscribe: (callback: (_: Params) => void) => {}}
	   };
}
