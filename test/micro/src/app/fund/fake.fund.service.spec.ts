import { FakeHttp, addPostExpectation } from 'factory/fake.http'

describe('Expectation matching', () => {
    it('fails when the actual body is not expected', (done: any) => {
	let subject = new FakeHttp();
	let aRequest = { url: '/home', body: { fund: 'shop' } }

	addPostExpectation(subject, aRequest, {})

	try {
	    subject.post('/home', { });
	} catch(actual) {
	    done()
	}
    })

    it('succeeds when the actual body is expected', () => {
	let subject = new FakeHttp();
	let aRequest = { url: '/home', body: { fund: 'shop' } }

	addPostExpectation(subject, aRequest, {})

	subject.post('/home', { fund: 'shop' });
    })
})
