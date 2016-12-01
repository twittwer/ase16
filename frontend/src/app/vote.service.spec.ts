/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { VoteService } from './vote.service';
import { UserService } from './user.service';

describe( 'Service: Vote', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers: [
        VoteService,
        UserService
      ]
    } );
  } );

  it( 'should ...', inject( [ VoteService ], ( service: VoteService ) => {
    expect( service )
      .toBeTruthy();
  } ) );
} );
