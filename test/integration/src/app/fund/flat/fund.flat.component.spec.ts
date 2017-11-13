import { TestBed }        from '@angular/core/testing';
import { By }             from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { OpportunityCardComponent } from 'app/opportunity/card/opportunity.card.component';
import { FundFlatComponent } from 'app/fund/flat/fund.flat.component';
import { FundService }       from 'app/fund/fund.service';
import { Stale }             from 'app/opportunity/model/data.type';

import { IdentityService } from 'app/identity/identity.service';

import * as Fixture from 'factory/fund/fund.fixture';
import { empty    } from 'factory/fund/fake.service';
import { withFund } from 'factory/stub.activated.route';
import { ParticipantNamePipe } from 'app/identity/participant.name.pipe'

describe('Request for a new opportunity', () => {

  it('uses the guid generator to identify the new opportunity', (done: any) => {
    run((fixture: any) => {

      let guidGenerator = { guid: () => 'anIdenity' }

      let checkName = (actual: Stale) => {
        expect(actual.name).toEqual('anIdenity');
        done()
      }

      fixture.componentInstance.effectiveStale(guidGenerator).then(checkName)
    }, Fixture.aUriIdentity())
  })

  it('triggers a comamnd for a new opportunity', (done: any) => {
    let expected = Fixture.aUriIdentity();

    run((fixture: any) => {

      fixture
        .debugElement
        .query(By.css('#askforopportunity'))
        .triggerEventHandler('click', null);

      let checkPush = () => {
        let actual = TestBed.get(FundService, null);
        expect(actual.getLastPushedOpportunity().fund)
          .toEqual(expected.name);

        done()
      }

      setTimeout(checkPush, 5000)
    }, expected)
  }, 10000)
})

let declarations: any = [FundFlatComponent, OpportunityCardComponent, ParticipantNamePipe];

let run = (scenario: any, expected?: any) => {
  let providers = [{ provide: FundService, useValue: empty() }
    , { provide: ActivatedRoute, useValue: withFund(expected) }
    , { provide: IdentityService, useValue: { fetch: () => Promise.resolve('')} }]

  let configuration = { declarations: declarations, providers: providers };

  let execute = () => {
    let fixture = TestBed.createComponent(FundFlatComponent);
    fixture.whenStable().then(() => scenario(fixture))
  }

  TestBed
    .configureTestingModule(configuration)
    .compileComponents()
    .then(execute);
}
