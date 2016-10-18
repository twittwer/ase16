import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {SuiModule} from 'ng2-semantic-ui/ng2-semantic-ui';

import { AppComponent }  from './app.component';
import { HeaderComponent }  from './app-header.component';
import { MessageBoxComponent }  from './app-messagebox.component';

@NgModule({
  imports:      [ BrowserModule, SuiModule ],
  declarations: [ AppComponent,
    HeaderComponent,
    MessageBoxComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
