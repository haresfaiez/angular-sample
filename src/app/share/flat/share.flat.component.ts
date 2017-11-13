import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ShareService } from 'app/share/share.service';

import { Flat, Factory, isFactory, Notification, Error }  from 'app/share/model/data.type';

const Null = {
  identity: ''
  , asset: { name: '' }
  , equity: { percentage: 0 }
  , scope: ''
  , initiation: new Date()
};

@Component({
  selector: 'share-flat'
  , templateUrl: './share.flat.view.html'
})
export class ShareFlatComponent implements OnInit {

  subject: Flat = Null;
  notification: Notification[] = [];
  error: Error[] = [];
  distribution = { target: '' }

  constructor(private service: ShareService, private route: ActivatedRoute) { }

  distribute() {
    console.log(`Distributing ${JSON.stringify(this.distribution)}`)
			let distribute = (params: any) =>
	      this.service.distribute(params.name, this.distribution.target, params.owner);

		this.route.params.subscribe(distribute);
  }

  ngOnInit(): void {
    this.route.params.subscribe(this.service.pull(this));
  }
}
