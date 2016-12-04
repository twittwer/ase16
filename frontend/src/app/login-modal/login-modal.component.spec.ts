/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { UserService } from '../user.service';
import { LoginModalComponent } from './login-modal.component';

describe( 'Component: LoginModal', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers   : [
        UserService
      ],
      declarations: [
        LoginModalComponent
      ]
    } );

    this.fixture = TestBed.createComponent( LoginModalComponent );
  } );

  it( 'should create an instance', () => {
    let component = this.fixture.debugElement.componentInstance;
    expect( component )
      .toBeTruthy();
  } );
} );
