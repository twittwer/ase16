/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { UserService } from '../user.service';
import { HeaderComponent } from './header.component';

describe( 'Component: Header', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers   : [
        UserService
      ],
      declarations: [
        HeaderComponent
      ]
    } );

    this.fixture = TestBed.createComponent( HeaderComponent );
  } );

  it( 'should create an instance', () => {
    let component = this.fixture.debugElement.componentInstance;
    expect( component )
      .toBeTruthy();
  } );
} );
