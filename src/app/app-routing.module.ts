import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { ViewNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [ { path: '**', component: ViewNotFoundComponent } ];

@NgModule({
    imports: [
	RouterModule.forRoot(appRoutes)
    ]
    , exports: [
	RouterModule
    ]
})
export class AppRoutingModule { }
