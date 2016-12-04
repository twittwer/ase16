/* tslint:disable:no-unused-variable */
import { QuestionListComponent } from './question-list.component';
import { TestBed } from '@angular/core/testing';

describe( 'Component: QuestionList', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      declarations: [
        QuestionListComponent
      ]
    } );

    this.fixture = TestBed.createComponent( QuestionListComponent );
  } );

  it( 'should create an instance', () => {
    let component = this.fixture.debugElement.componentInstance;
    expect( component )
      .toBeTruthy();
  } );
} );
