import { Flat, DefaultFactory, Uri, Stale } from 'app/share/model/data.type';

import { ShareComponent } from 'app/share/share.component';
import { ShareService   } from 'app/share/share.service';

export class FakeShareService extends ShareService {

    lastPushedShare: Stale;
    expectedShare  : Flat;

    constructor() {
	super(null, {server: { url: '' } })
    }

    pull(inside: ShareComponent) {
	return (input: Uri) =>
	    {
		if (! this.expectedShare) {
		    inside.subject = DefaultFactory
		    return;
		}

		if(input.name !== this.expectedShare.asset.name)
		    throw new Error('Non expected share name');

		inside.subject = this.expectedShare
	    }
    }

    push(base: ShareComponent) {
	return (aNewShare: Stale) => this.lastPushedShare = aNewShare
    }

    lastPush() {
	return this.lastPushedShare;
    }
}

export function empty() {
    return new FakeShareService();
}

export function expecting(expected: Flat) {
    let result = new FakeShareService()
    result.expectedShare = expected;
    return result
}
