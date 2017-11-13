import { grantCommand
	 , Stale
	 , flat
	 , CreationForbid
	 , CreationSuccess
	 , Factory
	 , isFactory
	 , name
	 , owner
	 , scope
	 , percentage
	 , Flat } from 'app/share/model/data.type';

import { ShareContainer } from 'app/share/share.container';
import { ShareService }   from 'app/share/share.service';

import { aShare
	 , aRawShare
	 , aUriWithName
	 , aUri
	 , nullContainer } from 'factory/share/share.fixture';

import { FakeHttp
	 , nullConfiguration
	 , addPutExpectation
	 , addGetExpectation } from 'factory/fake.http'

describe('Creation of a new share', () => {
    let aHttpServer: FakeHttp;
    let aService   : ShareService;
    let actual     : ShareContainer;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	aService    = new ShareService(aHttpServer, nullConfiguration);
	actual      = nullContainer();
    })

    beforeEach(() => {
    })

    it('puts an error into the container when the server forbid the creation'
       , () => {
	   let subject = aShare();
	   let aRequest = { url: `/share/${subject.owner}/${subject.name}`
			    , body: grantCommand(subject) };
	   addPutExpectation(aHttpServer, aRequest, { status: 403 });

	   actual.input = { scope: scope(subject), equity: percentage(subject) };
	   aService.push(actual)({ name: name(subject), owner: owner(subject)});

	   expect(actual.error).toEqual([ CreationForbid ]);
       })

    it('acknowledges a success to the container if the server accepts the command'
       , () => {
	   let subject  = aShare();
	   let aRequest = { url: `/share/${subject.owner}/${subject.name}`
			    , body: grantCommand(subject) };
	   addPutExpectation(aHttpServer, aRequest, { status: 204 });

	   actual.input = { scope: scope(subject), equity: percentage(subject) };
	   aService.push(actual)({ name: name(subject), owner: owner(subject)});

	   expect(aHttpServer.expectation[0].request).toEqual(aHttpServer.actual);
	   expect(actual.notification).toEqual([ CreationSuccess ]);
       })
})

describe('Missing share', () => {
    let aHttpServer: FakeHttp;
    let aService   : ShareService;
    let actual     : ShareContainer;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	aService    = new ShareService(aHttpServer, nullConfiguration);
	actual      = nullContainer();
    })

    it('sets up the component to ask for a new share', () => {
	let uri = aUri();
	addGetExpectation(aHttpServer
			  , { url: `/share/${owner(uri)}/${name(uri)}` }
			  , { status: 404 });

	aService.pull(actual)(uri);

	expect(isFactory(<Flat | Factory>actual.subject)).toBe(true);
    })
})

describe('Existing share', () => {
    let aHttpServer: FakeHttp;
    let aService   : ShareService;
    let actual     : ShareContainer;

    beforeEach(() => {
	aHttpServer = new FakeHttp();
	aService    = new ShareService(aHttpServer, nullConfiguration);
	actual      = nullContainer();
    })

    it('is flattened into the container', () => {
	let expected = aRawShare();
	let uri      = aUriWithName(name(expected));

	addGetExpectation(aHttpServer
			  , { url: `/share/${owner(uri)}/${name(expected)}`}
			  , { body: expected, status: 200 });

	aService.pull(actual)(uri);

	expect(<Flat>actual.subject).toEqual(flat(expected));
    })
})
