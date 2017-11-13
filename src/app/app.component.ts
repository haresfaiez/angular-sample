import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'my-app'
    , templateUrl: './app.view.html'
    , styleUrls: ['./app.style.css']
    , encapsulation: ViewEncapsulation.None
})
export class AppComponent  {
  name = 'Fundraising';
  target = { fund : '' }

  constructor(private router: Router) { }

  findFund() {
    this.router.navigate([ `/fund/${this.target.fund}` ])
  }
}
