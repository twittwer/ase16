/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';

describe( 'Service: User', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers: [ UserService ]
    } );
  } );


  it( 'check logged before login', inject( [ UserService ], ( service: UserService ) => {
    expect( service.isLoggedIn() )
      .toBeFalsy();
  } ) );


  it( 'check logged after login', inject( [ UserService ], ( service: UserService ) => {
    service.login( 'FooBar', () => {
      expect( service.isLoggedIn() )
        .toBeTruthy();
    } );
  } ) );

  it( 'check logged after logout', inject( [ UserService ], ( service: UserService ) => {
    service.logout();
    expect( service.isLoggedIn() )
      .toBeFalsy();
  } ) );

  it( 'check username after login with name FooBar', inject( [ UserService ], ( service: UserService ) => {
    service.login( 'FooBar', () => {
      expect( service.getUsername() )
        .toBe( 'FooBar' );
    } );
  } ) );

  it( 'check username after logout', inject( [ UserService ], ( service: UserService ) => {
    service.login( 'FooBar', () => {
      service.logout();
      expect( service.getUsername() )
        .toBeNull();
    } );
  } ) );

} );
