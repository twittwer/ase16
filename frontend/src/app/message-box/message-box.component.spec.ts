/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { UserService } from '../user.service';
import { VoteService } from '../vote.service';
import { MessageBoxComponent } from './message-box.component';
import { VoteFormComponent } from '../vote-form/vote-form.component';
import { HistoryComponent } from '../history/history.component';
import { QuestionListComponent } from '../question-list/question-list.component';

describe( 'Component: MessageBox', () => {
  beforeEach( () => {
    TestBed.configureTestingModule( {
      providers   : [
        UserService,
        VoteService
      ],
      declarations: [
        MessageBoxComponent,
        VoteFormComponent,
        HistoryComponent,
        QuestionListComponent
      ]
    } );

    this.fixture = TestBed.createComponent( MessageBoxComponent );
  } );

  it( 'should create an instance', () => {
    let component = this.fixture.debugElement.componentInstance;
    expect( component )
      .toBeTruthy();
  } );
} );
