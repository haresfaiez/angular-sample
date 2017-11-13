import { ActivatedRoute, Router }           from '@angular/router';
import { By }                               from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { aFlat } from 'factory/opportunity/opportunity.fixture';

import { FundService } from 'app/fund/fund.service';

import * as FakeService        from 'factory/fund/fake.service';
import * as ActivatedRouteStub from 'factory/stub.activated.route';

import { name } from 'app/opportunity/model/data.type';
import { OpportunityCardComponent } from 'app/opportunity/card/opportunity.card.component';
import { ParticipantNamePipe } from 'app/identity/participant.name.pipe'
import { IdentityService } from 'app/identity/identity.service';

describe('Update of an opportunity', function() {
    let aFund = { name: 'aFund' }
    let providers = () => {
	return [{ provide: FundService, useValue: FakeService.empty() }
		, { provide: ActivatedRoute, useValue: ActivatedRouteStub.withFund(aFund)}
    , { provide: IdentityService, useValue: { fetch: () => Promise.resolve('')} }
	       ];
    };

    it('sends the details of the upgrade to the server'
       , (done: () => void) => {
	   TestBed.configureTestingModule(
	       { declarations: [ OpportunityCardComponent, ParticipantNamePipe ]
		 , providers: providers() })
	       .compileComponents()
	       .then(() => {
		   let fixture = TestBed.createComponent(OpportunityCardComponent);

		   let target = aFlat(aFund.name);
		   fixture.componentInstance.opportunity = target;

		   fixture
		       .debugElement
		       .query(By.css('#upgrade'))
		       .triggerEventHandler('click', null);

		   let service  = TestBed.get(FundService, null);
		   let expected = { name: name(target), address: aFund.name };
		   expect(service.lastOpportunityUpgrade()).toEqual(expected);

		   done();
	       })
       })
})
