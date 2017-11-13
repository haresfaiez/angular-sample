import * as Fund         from 'app/fund/model/data.type';

import { FundService }   from 'app/fund/fund.service';
import { FundContainer } from 'app/fund/fund.container';

import { aContacted
	 , aDueDiligence
	 , aFlatDueDiligence
	 , aFlatContacted } from 'factory/opportunity/opportunity.fixture';
import { FakeHttp
	 , nullConfiguration
	 , addPutExpectation
	 , addPostExpectation
	 , addGetExpectation } from 'factory/fake.http'

const nullFundContainer = () => new FundContainer<any>([], [], [], '', []);

describe('The collection of opportunities of a fund', () => {
    let aHttpServer: FakeHttp;
    let aService   : FundService;
    let actual     : FundContainer<any>;

    let aFund    = 'aFundIdentityy';
    let aRequest = { url: `/fund/${aFund}` }

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	aService    = new FundService(aHttpServer, nullConfiguration);
	actual      = nullFundContainer();
    })

    it('with due deligence status should be grouped by status', (done: any) => {
	let aDueDiligenceOpportunity = aDueDiligence();
	let expected                 = aFlatDueDiligence(aFund);

	let response = { opportunities: [ { name: aDueDiligenceOpportunity.name
					    , scope: aFund } ]
			 , meta: {} }

	addGetExpectation(aHttpServer, aRequest, { status: 200, body: response });

	addGetExpectation(aHttpServer
			  , { url: `/opportunity/${aDueDiligenceOpportunity.name}` }
			  , { status: 200, body: aDueDiligenceOpportunity });

	aService.pullFund(actual)({ name: aFund })
	setTimeout(() => {
		expect(actual.opportunities.dueDiligence).toEqual([ expected ]);
		done()
	}, 2000)
    }, 4000)
})
