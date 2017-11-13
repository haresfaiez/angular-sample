import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { FundService }       from './fund.service';

import { FundComponent }     from './fund.component';
import { FundFlatComponent } from './flat/fund.flat.component';

import { FundRoutingModule } from './fund-routing.module';

import { OpportunityModule } from 'app/opportunity/opportunity.module';

export const declarations =
  [
    FundComponent
    , FundFlatComponent
  ];

@NgModule({
  imports: [
    CommonModule
    , FundRoutingModule
    , OpportunityModule
    , FormsModule
  ]
  , declarations: declarations
  , providers: [ FundService ]
})
export class FundModule { }
