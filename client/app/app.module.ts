/// <reference path="../../node_modules/@angular/common/index.d.ts" />
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { CommonComponentsModule } from 'commoncomponents';
import { Ng2Bs3ModalModule } from 'modalcomponent';

@NgModule({
  imports:      [ 
                  BrowserModule,
                  //CommonComponentsModule
                  Ng2Bs3ModalModule 
                ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }