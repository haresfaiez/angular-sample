import * as Fund from 'app/fund/model/data.type';

export class FundContainer<T> {

    constructor(public opportunities : T
		, public notification: Fund.Notification[]
		, public error       : Fund.Error[]
		, public name        : string
		, public target      : string[]) { }

}
