import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UriLabel }             from 'app/fund/model/data.type';

import { FundComponent }     from './fund.component';
import { FundFlatComponent } from './flat/fund.flat.component';

const fundRoutes: Routes = [
    { path: `fund/:${UriLabel}`, component: FundFlatComponent }
    , { path: `fund`, component: FundComponent }
];

@NgModule({
    imports: [
	RouterModule.forChild(fundRoutes)
    ]
    , exports: [
	RouterModule
    ]
})
export class FundRoutingModule { }
