/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { VoteService } from '../vote.service';
import { UserService } from '../user.service';
import { AddOptionComponent } from './add-option.component';
import { QuestionListComponent } from '../question-list/question-list.component';

describe( 'Component: AddOption', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers   : [
        VoteService,
        UserService
      ],
      declarations: [
        AddOptionComponent,
        QuestionListComponent
      ]
    } );

    this.fixture = TestBed.createComponent( AddOptionComponent );
  } );

  it( 'should create an instance', () => {
    let component = this.fixture.debugElement.componentInstance;
    expect( component )
      .toBeTruthy();
  } );
} );
