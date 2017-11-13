import { ActivatedRoute }                   from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';

import { Flat, identity } from 'app/share/model/data.type';

import { declarations as moduleDeclarations } from 'app/share/share.module';

import { ShareComponent } from 'app/share/share.component';
import { ShareService }   from 'app/share/share.service';

import { flatIdentified } from 'factory/share/share.fixture';

import { expecting, empty as emptyShare } from 'factory/share/fake.share.service';
import { withShare, empty as emptyRoute } from 'factory/stub.activated.route';


describe('Missing share', function() {

    it('asks for the creation share', (done: () => void) => {
	let expected = flatIdentified({ identity: '0x000', asset: { name: 'anAsset' } });

	run(configuration(emptyShare(), withShare(expected)))((fixture: any) => {
	    fixture.whenStable().then(() => {

		fixture.detectChanges();

		expect(fixture.componentInstance.shouldCreateShare()).toEqual(true);

		done()
	    })
	})
    })
})

describe('Share in the view', function () {

    it('takes null values initially', async(done: () => void) => {
	run(configuration(emptyShare(), emptyRoute()))((fixture: any) => {

	    let expected: Flat = { identity : ''
				   , asset  : { name: '' }
				   , scope  : ''
				   , initiation: new Date(0, 0, 0)
				   , equity : { percentage: 0 }
				 };

	    expect(fixture.componentInstance.subject).toEqual(expected);

	    done();
	});
    })

    it('is identified by the request route', async(done: () => void) => {
	let expected = flatIdentified({ identity: '0x000', asset: { name: 'anAsset' } });

	run(configuration(expecting(expected), withShare(expected)))((fixture: any) => {
	    fixture.whenStable().then(() => {

		fixture.detectChanges();

		let actual = fixture.componentInstance.subject;
		expect(identity(actual)).toEqual(identity(expected));

		done()
	    })
	});
    });
});

let run = (configuration: any) => (scenario: any) => {
    TestBed.configureTestingModule(configuration)
	.compileComponents()
	.then(() => {
	    let fixture = TestBed.createComponent(ShareComponent);
	    fixture.whenStable().then(() => { scenario(fixture); })
	});
}

let configuration = (aShareService: any, aRoute: any) => {
    let providers =
	[ { provide: ShareService, useValue: aShareService }
	  , { provide: ActivatedRoute, useValue: aRoute } ]

    return { imports: [ FormsModule ]
	     , declarations: moduleDeclarations
	     , providers: providers };
}
