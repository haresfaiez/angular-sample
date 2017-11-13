import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UriLabel, FundUriLabel } from 'app/opportunity/model/data.type';

import { OpportunityComponent } from './opportunity.component';

const opportunityRoutes: Routes = [
    { path: `fund/:${FundUriLabel}/:${UriLabel}`, component: OpportunityComponent }
];

@NgModule({
    imports: [
	RouterModule.forChild(opportunityRoutes)
    ]
    , exports: [
	RouterModule
    ]
})
export class OpportunityRoutingModule { }
