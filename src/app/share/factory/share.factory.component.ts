import { Component }       from '@angular/core';
import { ActivatedRoute }  from '@angular/router';

import { Factory
	 , Notification
	 , Error
	 , Description
	 , fragment
	 , DefaultFactory } from 'app/share/model/data.type';

import { ShareService } from 'app/share/share.service';

@Component({
    selector     : 'share-factory'
    , templateUrl: './share.factory.view.html'
})
export class ShareFactoryComponent {

    subject     : Factory        = DefaultFactory;
    notification: Notification[] = [];
    error       : Error[]        = [];
    input       : any            = { scope: '', equity: 0 };

    constructor(private service: ShareService, private route: ActivatedRoute) { }

    createShare() {
	this.route.params.subscribe(this.service.push(this));
    }
}
