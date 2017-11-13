import { ActivatedRoute } from '@angular/router';
import { By }             from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';

import { OpportunityComponent } from 'app/opportunity/opportunity.component';
import { FundService }          from 'app/fund/fund.service';

import { FlatUri } from 'app/opportunity/model/data.type';

import * as FakeService    from 'factory/fund/fake.service';
import { withOpportunity } from 'factory/stub.activated.route';

describe('Update of an opportunity', function() {
    let anOpportunity = { opportunity: 'anOpportunity' }
    let provide = (expected: FlatUri) => {
	return [{ provide: FundService, useValue: FakeService.empty() }
		, { provide: ActivatedRoute, useValue: withOpportunity(expected)}
	       ];
    };

    it('sends the details of the update to the server'
       , (done: () => void) => {
	   TestBed.configureTestingModule(
	       { imports: [ FormsModule ]
		 , declarations: [ OpportunityComponent ]
		 , providers: provide(anOpportunity) })
	       .compileComponents()
	       .then(() => {
		   let fixture = TestBed.createComponent(OpportunityComponent);

		   fixture.componentInstance.current =
		       { action              : 'Meeting'
			 , closingProbability: 1
			 , minimumValue      : 2
			 , maximumValue      : 3
		       };

		   fixture.debugElement.query(By.css('#update'))
		       .triggerEventHandler('click', null);

		   let service  = TestBed.get(FundService, null);
		   let expected = { opportunity: 'anOpportunity'
				    , update: { action              : 'Meeting'
						, closingProbability: 1
						, minimumValue      : 2
						, maximumValue      : 3
					      }}
		   expect(service.lastOpportunityUpdate()).toEqual(expected);

		   done();
	       })
       })
})
