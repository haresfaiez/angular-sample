import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentityComponent } from './identity.component'

const identityRoutes: Routes = [
    { path: `identity`
      , component: IdentityComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(identityRoutes) ]
    , exports: [ RouterModule ]
})
export class IdentityRoutingModule { }
