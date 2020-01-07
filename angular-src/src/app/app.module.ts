import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {TareaService} from './services/tarea.service';
import {FlashMessagesModule} from 'angular2-flash-messages';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {AuthGuard} from './guards/auth.guard';
import { AppRoutingModule, routedComponents } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents
  ],     
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule,
    BrowserAnimationsModule,
  ], 
  providers: [ValidateService,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }