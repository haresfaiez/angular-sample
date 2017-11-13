import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UriLabel } from 'app/share/model/data.type';

import { ShareComponent }   from './share.component';

const shareRoutes: Routes = [
    { path: `share/:${UriLabel.owner}/:${UriLabel.name}`
      , component: ShareComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(shareRoutes) ]
    , exports: [ RouterModule ]
})
export class ShareRoutingModule { }
