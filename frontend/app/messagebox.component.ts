import { Component } from '@angular/core';

@Component({
  selector: 'messagebox',
  template: `
    <div>
      message-Box
      <ngb-rating [rate]="2"></ngb-rating>
    </div>
  `
})
export class MessageBoxComponent {}
