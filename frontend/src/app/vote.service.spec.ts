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

  it( 'check for vote', inject( [ VoteService ], ( service: VoteService ) => {
    let vote = {
      title    : 'test',
      room     : 'default',
      closed_at: new Date(),
      options  : []
    };
    service.sendVote( vote, () => {
      expect( service.hasActiveVote() )
        .toBeTruthy();
    } );

  } ) );

  it( 'check actual vote', inject( [ VoteService ], ( service: VoteService ) => {
    let date = new Date( 'October 13, 2017 11:13:00' );
    let vote = {
      title    : 'Test aktuelles Vote',
      room     : 'default',
      closed_at: date,
      options  : []
    };
    service.sendVote( vote, () => {
      expect( service.getCurrentVote().title )
        .toBe( 'Test aktuelles Vote' );
    } );

  } ) );

  it( 'check if history is clean', inject( [ VoteService ], ( service: VoteService ) => {
    let vote = {
      title    : 'Test aktuelles Vote',
      room     : 'default',
      closed_at: new Date(),
      options  : []
    };
    expect( service.isHistoric( vote ) )
      .toBeFalsy();
  } ) );

  it( 'check if vote is in history', inject( [ VoteService ], ( service: VoteService ) => {
    let vote = {
      title    : 'Test aktuelles Vote',
      room     : 'default',
      closed_at: new Date(),
      options  : []
    };
    service.sendVote( vote, () => {
      expect( service.isHistoric( vote ) )
        .toBeTruthy();
    } );

  } ) );


} );
