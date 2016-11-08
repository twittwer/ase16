import { Component, EventEmitter, Output } from '@angular/core';
import { VoteService } from './vote.service';

@Component({
  moduleId: module.id,
  selector: 'addUserOption',
  template: `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" (click)="closeAddUserOption()">&times;</button>
                <h4 class="modal-title">Option anlegen</h4>
            </div>
            <div class="modal-body">
                <div class="input-group">
                    <div>
                        <h3>Optionen</h3>
                        <question-list (getOptions)="getOptions($event)"></question-list>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" (click)="addOption()">Anlegen</button>
                <button type="button" class="btn btn-default" (click)="closeAddUserOption()">Schließen</button>
            </div>
        </div>
    </div>
  `
})
export class AddOptionComponent {
  @Output() closeAddOptionForm = new EventEmitter<boolean>();
  public optionsArray: any = [];

  constructor(private voteService: VoteService) {
  };

  addOption() {

    this.closeAddOptionForm.emit(false);
    let options: any = this.voteService.getCurrentVote().options;
    this.optionsArray.forEach((option: string) => {
      options.push({ title: option });
    });

    console.log('call updateOptions', options);
    this.voteService.updateOptions(options, (success: any)=> {
      console.log('updateOptions success? ', success);
    });
  };

  closeAddUserOption() {
    this.closeAddOptionForm.emit(false);
  }

  getOptions(options: Array<any>) {
    this.optionsArray = options;
  }

}