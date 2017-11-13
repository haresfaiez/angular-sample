import { identity
	 , FundDoesNotExists } from 'app/fund/model/data.type';
import { Description } from 'app/fund/model/description';

import  { Raw
	  , OpportunityAlreadyExists
	  , OpportunityCreated
	  , opportunityDescription
	  , OpportunityDoesNotExists} from 'app/opportunity/model/data.type';

import { FundService }   from 'app/fund/fund.service';
import { OpportunityContainer } from 'app/opportunity/opportunity.container';

import { aContacted
	 , aDueDiligence
	 , aFlatDueDiligence
	 , aFlatContacted } from 'factory/opportunity/opportunity.fixture';

import { FakeHttp
	 , nullConfiguration
	 , addGetExpectation } from 'factory/fake.http'

const nullContainer = () => new OpportunityContainer<any>([], [], []);

describe('Non existing fund', () => {
    let aHttpServer: FakeHttp;
    let aService   : FundService;
    let actual     : OpportunityContainer<any>;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	aService    = new FundService(aHttpServer, nullConfiguration);
	actual      = nullContainer();
    })

    it('puts an error inside the container', () => {
	addGetExpectation(aHttpServer, { url: `/opportunity/anOpportunity` }
			  , { status: 404, body: { cause: 'NonExistingFund' } });

	let request = {fund: 'aNonExistingFund', opportunity: 'anOpportunity'};
	aService.pullOpportunity(actual)(request);

	expect(actual.error).toEqual([ FundDoesNotExists ]);
    })
})

describe('Non existing opportunity', () => {
    let aHttpServer: FakeHttp;
    let aService   : FundService;
    let actual     : OpportunityContainer<any>;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	aService    = new FundService(aHttpServer, nullConfiguration);
	actual      = nullContainer();
    })

    it('puts an error inside the container', () => {
	let expectedRequest = { url: `/opportunity/aNonExistingOpportunity` }
	addGetExpectation(aHttpServer, expectedRequest
			  , { status: 404, body: { cause: OpportunityDoesNotExists.cause } });

	let request = {fund: 'aFund', opportunity: 'aNonExistingOpportunity'};
	aService.pullOpportunity(actual)(request);

	expect(actual.error).toEqual([ OpportunityDoesNotExists ]);
    })
})

describe('Existing opportunity', () => {
    let aHttpServer: FakeHttp;
    let aService   : FundService;
    let actual     : OpportunityContainer<any>;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	aService    = new FundService(aHttpServer, nullConfiguration);
	actual      = nullContainer();
    })

    it('should be flatted into the container', () => {
	let aFundName    = 'aFundName';
	let expectedJson = { name: 'opportunityasset'
			     , creationDate      : '2017-06-03T23:00:00.000Z'
			     , closingProbability: '20'
			     , minimumValue      : '0'
			     , maximumValue      : '30'
			     , origin            : '0x123'
			     , status            : '0'
			     , domain            : 'OPPORTUNITY'
			   };

	addGetExpectation(aHttpServer
			  , { url: `/opportunity/${expectedJson.name}`}
			  , { body: expectedJson, status: 200 });


	let request = { fund: aFundName, opportunity: expectedJson.name }
	aService.pullOpportunity(actual)(request);

	let expected =
	    { identity            : { name: 'opportunityasset', fund: 'aFundName' }
	      , asset             : { origin: '0x123', domain: 'OPPORTUNITY' }
	      , value             : { min: 0, max: 30 }
	      , creationDate      : new Date('2017-06-03T23:00:00.000Z')
	      , closingProbability: 20
	      , status            : 'Contacted'
	    };

	expect(actual.subject).toEqual(expected);
    })
})
