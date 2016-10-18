import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { HeaderComponent }  from './app-header.component';
import { MessageBoxComponent }  from './app-messagebox.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent,
    HeaderComponent,
    MessageBoxComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
