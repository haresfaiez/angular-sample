import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { FundService }  from 'app/fund/fund.service';

import { OpportunityComponent }     from './opportunity.component';
import { OpportunityCardComponent } from './card/opportunity.card.component';

import { OpportunityRoutingModule } from './opportunity-routing.module';

import { IdentityModule } from 'app/identity/identity.module'

export const declarations: any =
  [
    OpportunityComponent
    , OpportunityCardComponent
  ];

@NgModule({
  imports: [
    CommonModule
    , OpportunityRoutingModule
    , IdentityModule
    , FormsModule
  ]
  , declarations: declarations
  , providers: [FundService]
  , exports: [OpportunityCardComponent]
})
export class OpportunityModule { }
