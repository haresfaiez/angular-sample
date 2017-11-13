import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { IdentityService } from 'app/identity/identity.service';

import { IdentityComponent } from 'app/identity/identity.component';

import { IdentityRoutingModule } from 'app/identity/identity-routing.module';

import { ParticipantNamePipe } from 'app/identity/participant.name.pipe'

export const declarations =
    [
	IdentityComponent
  , ParticipantNamePipe
    ];

@NgModule({
    imports: [
	CommonModule
	, IdentityRoutingModule
	, FormsModule
    ]
    , declarations: declarations
    , providers: [ IdentityService ]
    , exports: [ ParticipantNamePipe ]
})
export class IdentityModule { }
