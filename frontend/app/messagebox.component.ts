import { Component } from '@angular/core';

@Component({
  selector: 'messagebox',
  template: `
    <div class="messagebox-container">
        <div class="messagebox-showmessage">
            <chat-message *ngFor="let message of messages | async" [message]="message"></chat-message>
        </div>
        <div class="messagebox-sendmessage">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Write your Message here" (keydown.enter)="onEnter($event)" [(ngModel)]="draftMessage.text" >
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" (click)="onEnter($event)">Send</button>
                </span>
            </div>
        </div>
    </div>
  `
})
export class MessageBoxComponent {
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public userService: UserService,
              public el: ElementRef) {
  }

  ngOnInit(): void {
    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
        (thread: Thread) => {
          this.currentThread = thread;
        });

    this.userService.currentUser
        .subscribe(
            (user: User) => {
              this.currentUser = user;
            });

    this.messages
        .subscribe(
            (messages: Array<Message>) => {
              setTimeout(() => {
                this.scrollToBottom();
              });
            });
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  sendMessage(): void {
    let m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  scrollToBottom(): void {
    let scrollPane: any = this.el
        .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }
}
