import {Component} from '@angular/core';
import {Question} from './question.component';

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
                    <td>{{question.descr}}</td><td><button  class="btn btn-primary" (click)="removeQuestion(question)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
  `
})

export class QuestionListComponent {
    questions: Array<Question> = [];

    addQuestion(description){
        const question = new Question(description.value);
        this.questions.push(question);
        description.value = '';
    }

    removeQuestion(question){
        const index = this.questions.indexOf(question);
        this.questions.splice(index,1);
    }
}