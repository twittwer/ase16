/* tslint:disable:no-unused-variable */
import { VoteService } from '../vote.service';
import { TestBed } from '@angular/core/testing';
import { VoteFormComponent } from './vote-form.component';
import { QuestionListComponent } from '../question-list/question-list.component';
import { UserService } from '../user.service';

describe( 'Component: VoteForm', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers   : [
        VoteService,
        UserService
      ],
      declarations: [
        VoteFormComponent,
        QuestionListComponent
      ]
    } );

    this.fixture = TestBed.createComponent( VoteFormComponent );
  } );

  it( 'should create an instance', () => {
    let component = this.fixture.debugElement.componentInstance;
    expect( component )
      .toBeTruthy();
  } );
} );
