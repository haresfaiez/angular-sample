import { ActivatedRoute } from '@angular/router';
import { FormsModule }    from '@angular/forms';

import { declarations as moduleDeclarations } from 'app/share/share.module';
import { TestBed } from '@angular/core/testing';
import { By }      from '@angular/platform-browser';

import { ShareService } from 'app/share/share.service';

import { ShareFactoryComponent } from 'app/share/factory/share.factory.component';

import { withShareIdentified } from 'factory/stub.activated.route';
import { empty as emptyShare } from 'factory/share/fake.share.service';
import { aUri }                from 'factory/share/share.fixture';

describe('Share factory', function() {
    let anIdentity = aUri();

    it('extracts the share identity from the route', (done: any) => {
	run(configuration(withShareIdentified(anIdentity)))((fixture: any) => {

	    fixture
		.debugElement
		.query(By.css('#createShare'))
		.triggerEventHandler('click', null);

	    expect(TestBed.get(ShareService, null).lastPush()).toEqual(anIdentity);

	    done()
	});
    })
})

let configuration = (aRoute: any) => {
    let providers = [ { provide: ShareService, useValue: emptyShare() }
		      , { provide: ActivatedRoute, useValue: aRoute } ]

    return { imports: [ FormsModule ]
	     , declarations: moduleDeclarations
	     , providers: providers };
}

let run = (configuration: any) => (scenario: any) => {
    TestBed.configureTestingModule(configuration)
	.compileComponents()
	.then(() => {
	    let fixture = TestBed.createComponent(ShareFactoryComponent);
	    fixture.whenStable().then(() => { scenario(fixture); })
	});
}
