import { Identity as FundIdentity } from 'app/fund/model/data.type';
import { Stale
	 , Name
	 , Update
	 , Identity as OpportunityIdentity } from 'app/opportunity/model/data.type';

import { FundFlatComponent } from 'app/fund/flat/fund.flat.component';
import { FundService }       from 'app/fund/fund.service';

export class FakeService extends FundService {
    lastPushedOpportunity: Stale;
    lastUpdate: any;
    lastUpgrade: OpportunityIdentity & FundIdentity;

    description: any;

    constructor() {
	super(null, {server: { url: '' } });
    }

    pushOpportunity(aNewOpportunity: Stale) {
	return (flat: FundFlatComponent) => {
	    this.lastPushedOpportunity = aNewOpportunity;
	}
    }

    getLastPushedOpportunity() {
	return this.lastPushedOpportunity;
    }

    investTo(_: string) { }

    createFund(aDescription: any): Promise<FundIdentity> {
	this.description = aDescription;
	return Promise.resolve({ address: '' });
    }

    creationRequest(): any {
	return this.description
    }

    upgrade(anOpportunity: OpportunityIdentity & FundIdentity) {
	this.lastUpgrade = anOpportunity;
    }

    lastOpportunityUpgrade() {
	return this.lastUpgrade
    }

    update(anOpportunity: Name, theUpdate: Update) {
	this.lastUpdate = { opportunity: anOpportunity, update: theUpdate };
    }

    lastOpportunityUpdate() {
	return this.lastUpdate
    }
}

export function empty() {
    return new FakeService();
}
