import { RouterTestingModule }              from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }                               from '@angular/platform-browser';
import { DebugElement }                     from '@angular/core';

import { AppComponent }                     from 'app/app.component';


describe('AppComponent', function () {
    let de     : DebugElement;
    let comp   : AppComponent;
    let setup  : Promise<AppComponent>;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
	setup = TestBed.configureTestingModule({
	    declarations: [ AppComponent ]
	    , imports: [ RouterTestingModule ]
	}).compileComponents();
    })

    it('should create component', () => {
	setup.then(() => {
	    fixture = TestBed.createComponent(AppComponent);
	    comp    = fixture.componentInstance;
	    de      = fixture.debugElement.query(By.css('h1'));

	    expect(comp).toBeDefined();
	});
    } );

    it('should create component', () => {
	setup.then(() => {
	    fixture = TestBed.createComponent(AppComponent);
	    comp    = fixture.componentInstance;
	    de      = fixture.debugElement.query(By.css('h1'));

	    fixture.detectChanges();
	    const h1 = de.nativeElement;
	    expect(h1.innerText).toBe('Hello Fundraising'
				      , '<h1> should say something about "Fundraising"');
	});
    });

});
