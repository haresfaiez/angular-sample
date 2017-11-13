import { ActivatedRoute, Router } from '@angular/router';
import { By }                     from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';

import { FundComponent } from 'app/fund/fund.component';
import { FundService }   from 'app/fund/fund.service';

import * as FakeService        from 'factory/fund/fake.service';
import * as ActivatedRouteStub from 'factory/stub.activated.route';

describe('The fund creation event', function() {
    let buildSubject: any;

    beforeEach(() => {
	let configuration = { imports       : [ FormsModule ]
			      , declarations: [FundComponent]
			      , providers   : noInputs() }
	buildSubject      =  TestBed.configureTestingModule(configuration)
	    .compileComponents()
    })

    it('triggers a fund creation request', (done: any) => {
	let execute = () => {
	    let subject = TestBed.createComponent(FundComponent);
	    subject.componentInstance.name = 'building'
	    subject.componentInstance.firstTarget  = 'aShop';
	    subject.componentInstance.secondTarget = '';
	    subject.componentInstance.thirdTarget  = '';

	    subject
		.debugElement
		.query(By.css('#createFund'))
		.triggerEventHandler('click', null);

	    let expected: any = { name: 'building', target: ['aShop'] }

	    let actual = TestBed.get(FundService, null).creationRequest()
	    expect(actual).toEqual(expected)

	    done();
	}

	buildSubject.then(execute)
    })
})

let noInputs = () => {
    return [{ provide: FundService, useValue: FakeService.empty() }
	    , { provide: ActivatedRoute, useValue: ActivatedRouteStub.empty()}
	    , { provide: Router, useValue: { navigate: (_: any[]) => {} }}
	   ];
}
