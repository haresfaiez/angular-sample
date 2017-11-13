import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Flat, Update }        from './model/data.type';

import { FundService }          from 'app/fund/fund.service';
import { OpportunityContainer } from './opportunity.container';

let NullFlat =
  {
    identity: { name: '', fund: '' },
    asset: { origin: '', domain: '' },
    value: { min: 0, max: 0 },
    creationDate: new Date(),
    closingProbability: 0,
    status: '',
  }

@Component({
  templateUrl: './opportunity.view.html'
})
export class OpportunityComponent extends OpportunityContainer<Flat> implements OnInit {

  current: Update;
  journal: any[] = []

  constructor(private service: FundService, private route: ActivatedRoute) {
    super(NullFlat, [], []);
    this.current = { action: '', closingProbability: 0, minimumValue: 0, maximumValue: 0 };
  }

  update() {
    let askForUpdate = (params: any) =>
      this.service.update(params.opportunity, this.current, params.fund);

    this.route.params.subscribe(askForUpdate);
  }

  ngOnInit(): void {
    this.route.params.subscribe(this.service.pullOpportunity(this));
  }
}
