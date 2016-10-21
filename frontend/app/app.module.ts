import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

<<<<<<< HEAD
import { AppComponent }  from './app.component';
import { HeaderComponent }  from './header.component';
import { MessageBoxComponent }  from './messagebox.component';
import { NgbdModalBasic } from './modal-login.component';
import { VotingComponent } from './voting.component';
import { VotingFormComponent }  from './voting-Form.component';

import { Cookie } from 'ng2-cookies/ng2-cookies';


@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    MessageBoxComponent,
    NgbdModalBasic,
    VotingComponent,
    VotingFormComponent
  ],
  bootstrap: [ AppComponent ]
=======
import {AppComponent}  from './app.component';
import {HeaderComponent}  from './header.component';
import {MessageBoxComponent}  from './messagebox.component';
import {NgbdModalBasic} from './modal-login.component';
import {UserService} from "./user.service";

@NgModule({
    imports: [
        BrowserModule,
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        MessageBoxComponent,
        NgbdModalBasic
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
>>>>>>> bcfb52f0381d5c220ac0d4bb1378a5719c286c15
})
export class AppModule {
}
