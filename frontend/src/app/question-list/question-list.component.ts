import { Component, Output, EventEmitter } from '@angular/core';

@Component( {
  selector   : 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls  : [ './question-list.component.scss' ]
} )
export class QuestionListComponent {
  @Output() getOptions = new EventEmitter();

  questions: string[] = [];

  addQuestion ( description: any ) {
    this.questions.push( description.value );
    description.value = '';
    this.getOptions.emit( this.questions );
  }

  removeQuestion ( question ) {
    const index = this.questions.indexOf( question );
    this.questions.splice( index, 1 );
  }
}
