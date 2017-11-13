import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ShareService } from 'app/share/share.service';

import { Flat, Factory, isFactory, Notification, Error }  from 'app/share/model/data.type';

const Null: Flat = { identity: ''
		     , asset: { name: '' }
		     , scope: ''
		     , initiation: new Date(0, 0, 0)
		     , equity: {percentage: 0}};

@Component({
    templateUrl: 'app/share/share.view.html'
})
export class ShareComponent implements OnInit {

    subject     : Flat | Factory = Null;
    notification: Notification[] = [];
    error       : Error[]        = [];

    constructor(private service: ShareService, private route: ActivatedRoute) { }

    shouldCreateShare() {
	return isFactory(<Flat | Factory>this.subject);
    }

    ngOnInit(): void {
	this.route.params.subscribe(this.service.pull(this));
    }
}
