import { Observable } from 'rxjs/Observable';

import { Http
	 , RequestOptionsArgs
	 , RequestOptions
	 , Request
	 , Response
	 , ResponseOptions
	 , ConnectionBackend
	 , Connection } from '@angular/http';

type Expectation = { method: string; request: RequestOptions; response: Response; };

interface Observer<T> {
    closed? : boolean;
    next    : (value: T) => void;
    error   : (err: Response | Error) => void;
    complete: () => void;
};

class FakeConnection extends Connection {}
class FakeConnectionBackend implements ConnectionBackend {
    createConnection(request: any) {
	return new FakeConnection();
    }
}

export function addPutExpectation(subject: FakeHttp, aRequest: any, aResponse: any) {
    let theRequest     = new RequestOptions(aRequest)
    let theResponse    = new Response(new ResponseOptions(aResponse))
    let anExpectation  = { method: 'put', request: theRequest, response: theResponse }
    subject.expect(anExpectation);
}

export function addPostExpectation(subject: FakeHttp, aRequest: any, aResponse: any) {
    let theRequest     = new RequestOptions(aRequest)
    let theResponse    = new Response(new ResponseOptions(aResponse))
    let anExpectation  = { method: 'post', request: theRequest, response: theResponse }
    subject.expect(anExpectation);
}

export function addGetExpectation(subject: FakeHttp, aRequest: any, aResponse: any) {
    let theRequest     = new RequestOptions(aRequest)
    let theResponse    = new Response(new ResponseOptions(aResponse))
    let anExpectation  = { method: 'get', request: theRequest, response: theResponse }
    subject.expect(anExpectation);
}

export class FakeHttp extends Http {

    public expectation: Expectation[] = [];
    public actual     : RequestOptions;

    constructor() {
	super(new FakeConnectionBackend(), new RequestOptions())
    }

    expect(anExpectation: Expectation) {
	this.expectation.push(anExpectation);
    }

    post(aUrl: string, aBody: any, options?: RequestOptionsArgs) {
	return check('post', this.expectation)(aUrl, aBody);
    }

    put(aUrl: string, aBody: {}, options?: RequestOptionsArgs) {
	if ('put' !== this.expectation[0].method)
	    throw new Error('The request method is not expected');

	this.actual  = new RequestOptions({ url: aUrl, body: aBody});

	let response = (observer: Observer<Response>) => {
	    observer.next(this.expectation[0].response);
	};

	if (403 === this.expectation[0].response.status) {
	    response = (observer: Observer<Response>) => {
		observer.error(this.expectation[0].response);
	    };
	}

	return new Observable<Response>(response);
    }

    get(aUrl: string, options?: RequestOptionsArgs) {
	return check('get', this.expectation)(aUrl);
    }
}

let check = (method: string, expectation: Expectation[]) =>
    (aUrl: string, aBody?: any) => {
	let potentials = expectation
	    .filter((each: Expectation) => { return each.method === method; })

	if (potentials.length === 0)
	    throw new Error('The request method is not expected');

	let targetUrl = (each: Expectation) => each.request.url === aUrl
	let it = potentials.filter(targetUrl)

	if (0 === it.length)
	    throw new Error(`No handle for the request url exists`);

	let targetBody = (each: Expectation) => {
	    if (each.request.body)
		return JSON.stringify(each.request.body) === JSON.stringify(aBody)
	    return true;
	}

	let each: any;
	if (aBody) each = it.find(targetBody)
	else       each = it[0]

	if (undefined === each)
	    throw new Error(`No handle for the request body exists`);

	let response = (observer: Observer<Response>) => {
	    observer.next(each.response);
	};

	if (404 === each.response.status) {
	    response = (observer: Observer<Response>) => {
		observer.error(each.response);
	    };
	}

	let result = new Observable<Response>(response)
	return result;
    }

export const nullConfiguration = {
    "server": { "url" : "/" }
}
