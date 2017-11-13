import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule }  from '@angular/forms';

import { Configuration } from 'app/configuration';

import { AppRoutingModule }  from './app-routing.module';
import { ShareModule }       from 'app/share/share.module'
import { FundModule }        from 'app/fund/fund.module'
import { OpportunityModule } from 'app/opportunity/opportunity.module'
import { IdentityModule }    from 'app/identity/identity.module'

import { AppComponent }          from 'app/app.component';
import { ViewNotFoundComponent } from './not-found.component';

import { Configuration as actualConfiguration } from 'config/development';

@NgModule({
    imports:      [ BrowserModule
		    , OpportunityModule
		    , ShareModule
		    , FundModule
        , IdentityModule
		    , HttpModule
		    , AppRoutingModule
        , FormsModule ]
    , declarations: [ AppComponent
		      , ViewNotFoundComponent
		    ]
    , bootstrap:    [ AppComponent ]
    , providers: [ { provide: Configuration, useValue: actualConfiguration } ]
})
export class AppModule { }
