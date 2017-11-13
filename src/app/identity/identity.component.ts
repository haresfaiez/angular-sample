import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute }  from '@angular/router';

import { IdentityService } from 'app/identity/identity.service';

@Component({
  templateUrl: './identity.view.html'
})
export class IdentityComponent implements OnInit {

  current: any = { name: 'currentName' };
  theupdate: any = { name: '' };

  constructor(private service: IdentityService) { }

  ngOnInit(): void {
    this.service.pull(this);
  }

  update() {
    this.service.udpate(this.theupdate)
  }
}
