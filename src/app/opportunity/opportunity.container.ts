import * as Opportunity from 'app/opportunity/model/data.type';

export class OpportunityContainer<T> {

    constructor(public subject       : T
		, public notification: Opportunity.Notification[]
		, public error       : Opportunity.Error[]) { }
}
