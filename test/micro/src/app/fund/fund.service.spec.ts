import { Identity
	 , identity
	 , FundDoesNotExists } from 'app/fund/model/data.type';
import { Description } from 'app/fund/model/description';

import  { Raw
	  , NullSplit
	  , OpportunityAlreadyExists
	  , OpportunityCreated
	  , opportunityDescription
	  , OpportunityDoesNotExists} from 'app/opportunity/model/data.type';

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

describe('Pulling a fund', () => {
    let aHttpServer: FakeHttp;
    let subject    : FundService;
    let actual     : FundContainer<any>;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	subject     = new FundService(aHttpServer, nullConfiguration);
	actual      = nullFundContainer();
    })

    it('inserts its name into the container', (done: any) => {
	let aFund    = 'someFund';
	let expected = aContacted();

	let response = { opportunities: <any>[ ], meta: { name: 'Jan-Commit' } }

	addGetExpectation(aHttpServer, { url: `/fund/${aFund}` }
			  , { status: 200, body: response });

	let checkNameChanged = (_: any) => {
	    expect(actual.name).toEqual('Jan-Commit') 
	    done()
	}

	subject.pullFund(actual)({ name: aFund }).then(checkNameChanged)
	
    })
})

describe('The collection of opportunities of a fund', () => {
    let aHttpServer: FakeHttp;
    let subject    : FundService;
    let actual     : FundContainer<any>;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	subject     = new FundService(aHttpServer, nullConfiguration);
	actual      = nullFundContainer();
    })

    it('are grouped by status', (done: any) => {
	let aFund    = 'someFund';
	let expected = aContacted();

	let response = { opportunities: [ { name: expected.name, scope: aFund } ]
			 , meta: { } }

	addGetExpectation(aHttpServer, { url: `/fund/${aFund}` }
			  , { status: 200, body: response });

	addGetExpectation(aHttpServer, { url: `/opportunity/${expected.name}` }
			  , { status: 200, body: expected });

	let checkOpportunities = (_: any) => {
	    expect(actual.opportunities.contacted)
		.toEqual([ aFlatContacted(aFund) ]) 
	    done()
	}

	subject.pullFund(actual)({ name: aFund }).then(checkOpportunities)
    })

    it('is empty when the fund has no opportunities', (done: any) => {
	let aFund = 'aFundIdentityy';

	addGetExpectation(aHttpServer
			  , { url: `/fund/${aFund}` }
			  , { status: 200, body: { opportunities: [ ], meta: { }}})

	let checkEmpty = (actual: any) => {
	    expect(actual).toEqual([ ])
	    done()
	}

	let checkNoOpportunities = (_: any) => {
	    expect(actual.opportunities).toEqual(NullSplit) 
	    done()
	}

	subject.pullFund(actual)({ name: aFund }).then(checkNoOpportunities)
    })
})

describe('Creation of a new fund', () => {
    let aHttpServer: FakeHttp;
    let subject   : FundService;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	subject    = new FundService(aHttpServer, nullConfiguration);
    })

    it('redirected to the fund view if successful', (done: () => void) => {
	let expected: Description = { name: '', target: [] }
	let expectedIdentity      = { address: '0x13' };

	addPostExpectation(aHttpServer
			   , { url: `/fund/`
			       , body: expected }
			   , { status: 200, body: expectedIdentity });

	subject.createFund(expected)
	    .then((actualIdentity: Identity) => {
		expect(actualIdentity).toEqual(expectedIdentity);
		done()
	    })

    })
})

describe('Creation of a new opportunity', () => {
    let aHttpServer: FakeHttp;
    let subject   : FundService;
    let actual     : FundContainer<any>;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	subject    = new FundService(aHttpServer, nullConfiguration);
	actual      = nullFundContainer();
    })

    it('fails when the server forbid the creation', () => {
	const anOpportunity = { fund: 'aFund', name: 'anOpportunity' };
	let aRequest = { url: `/fund/${anOpportunity.fund}/anExistingOpportunity`
			 , body: opportunityDescription() };

	addPutExpectation(aHttpServer, aRequest, { status: 403 });

	subject.pushOpportunity(anOpportunity)(actual);

	expect(actual.error).toEqual([ OpportunityAlreadyExists ]);
    })

    it('sends a put request to the server', () => {
	let anOpportunity = { fund: 'aFund', name: 'aNewOpportunity' };
	let aRequest      = { url: `/fund/${anOpportunity.fund}/aNewOpportunity`
			      , body: opportunityDescription() };
	addPutExpectation(aHttpServer, aRequest, { status: 204 });

	subject.pushOpportunity(anOpportunity)(actual);

	expect(aHttpServer.expectation[0].request).toEqual(aHttpServer.actual);
	expect(actual.notification).toEqual([ OpportunityCreated ]);
    })
})

describe('Existing opportunity', () => {
    let aHttpServer: FakeHttp;
    let subject   : FundService;
    let actual     : any;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	subject    = new FundService(aHttpServer, nullConfiguration);
    })

    it('in a array should be decorated with its description', () => {
	actual      = nullFundContainer();
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

	subject
	    .describe({ scope: aFundName, name: expectedJson.name })
	    .then((actual: Raw) => {
		let expected =
		    { identity : { name: 'opportunityasset', fund: 'aFundName' }
		      , asset  : { origin: '0x123', domain: 'OPPORTUNITY' }
		      , value             : { min: 0, max: 30 }
		      , creationDate      : new Date('2017-06-03T23:00:00.000Z')
		      , closingProbability: 20
		      , status            : 'Contacted'
		    };

		expect(actual).toEqual(expected);
	    });

    })
})

describe('The fund name in the uri', () => {
    it('is transformed to a FundIdentity data object', () => {
	expect(identity({ name: 'xyz' })).toEqual({ address: 'xyz' });
    })
})
