import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

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
})
export class AppModule {
}
