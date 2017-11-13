import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';

import { ShareService }          from 'app/share/share.service';

import { ShareComponent }        from './share.component';
import { ShareFactoryComponent } from './factory/share.factory.component';
import { ShareFlatComponent }    from './flat/share.flat.component';

import { ShareRoutingModule }    from './share-routing.module';

export const declarations =
    [
	ShareComponent
	, ShareFactoryComponent
	, ShareFlatComponent
    ];

@NgModule({
    imports: [
	CommonModule
	, ShareRoutingModule
	, FormsModule
    ]
    , declarations: declarations
    , providers: [ ShareService ]
})
export class ShareModule { }
