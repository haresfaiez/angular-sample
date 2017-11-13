import { OpportunityService } from 'app/opportunity/opportunity.service';

export class FakeService extends OpportunityService {

    constructor() {
	super(null, {server: { url: '' } });
    }

    lastOpportunityUpgrade() {
	return { name: 'anOpportunity'
		 , action: ''
		 , closingProbability: 0
		 , minimumValue: 0
		 , maximumValue: 0
	       }
    }

}

export function empty() {
    return new FakeService();
}
