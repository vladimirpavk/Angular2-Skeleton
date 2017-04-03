/// <reference path="../../node_modules/@angular/common/index.d.ts" />
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { CommonComponentsModule } from 'node_modules/ng2-flashbox/commoncomponents.module';

@NgModule({
  imports:      [ 
                  BrowserModule,
                  CommonComponentsModule 
                ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }