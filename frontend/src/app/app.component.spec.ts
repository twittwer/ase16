/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { VoteService } from './vote.service';

describe( 'App: Ase16', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      schemas     : [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers   : [
        UserService,
        VoteService
      ],
      declarations: [
        AppComponent
      ]
    } );

    this.fixture = TestBed.createComponent( AppComponent );
  } );

  it( 'should create the app', async( () => {
    let app = this.fixture.debugElement.componentInstance;
    expect( app )
      .toBeTruthy();
  } ) );

  it( `should have as title 'ase16'`, async( () => {
    let app = this.fixture.debugElement.componentInstance;
    expect( app.title )
      .toEqual( 'ase16' );
  } ) );

} );
