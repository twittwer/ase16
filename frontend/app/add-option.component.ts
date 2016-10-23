import { Component, EventEmitter, Input, Output} from '@angular/core';
import {VoteService} from './vote.service';
import { UserService } from "./user.service";

@Component({
    selector: 'addUserOption',
    template: `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" (click)="closeAddUserOption()">&times;</button>
                <h4 class="modal-title">Add New Option</h4>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <div>
                        <h3>Options</h3>
                        <question-list (getOptions)="getOptions($event)"></question-list>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" (click)="addOption()">Finish</button>
                <button type="button" class="btn btn-default" (click)="closeAddUserOption()">Close</button>
            </div>
        </div>
    </div>
  `
})
export class AddOptionComponent {
    @Output() closeAddOptionForm = new EventEmitter<boolean>();
    @Output() addNewOption = new EventEmitter<boolean>();
    public optionsArray: any = [];
    private currentVote = this.voteservice.getCurrentVote();

    constructor(private voteservice:VoteService){};


    addOption(){

        this.closeAddOptionForm.emit(false);
        let options: any = this.voteservice.getCurrentVote().options;
        this.optionsArray.forEach((option: string) => {
            options.push({title:option});
        });

        console.log();
        this.voteservice.updateOptions(options, (success: any)=>{
            console.log(success);
        });
    };

    closeAddUserOption(){
        this.closeAddOptionForm.emit(false);
    }

    getOptions(options:Array<any>){
        this.optionsArray = options;
    }

}
