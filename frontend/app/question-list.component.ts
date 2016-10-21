import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'question-list',
    template: `
    <div>
        <div class="addQuestionControls">
            <input type="text" class="form-control" #description placeholder="Your Answer here" />
            <button class="btn btn-primary" (click)="addQuestion(description)">Add</button>
        </div>
        <table class="table">
            <thead>
            </thead>
            <tbody>
                <tr *ngFor="let question of questions" style="margin-bottom: 10px;">
                    <td>{{question}}</td><td><button  class="btn btn-primary" (click)="removeQuestion(question)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
  `
})

export class QuestionListComponent {
    @Output() getOptions = new EventEmitter();

    questions: string[]=[];

    addQuestion(description){
        this.questions.push(description.value);
        description.value = '';
        this.getOptions.emit(this.questions);
    }

    removeQuestion(question){
        const index = this.questions.indexOf(question);
        this.questions.splice(index,1);
    }
}
