import './rxjs-extensions';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {HttpModule, JsonpModule}   from '@angular/http';

// Imports for loading & configuring the in-memory web api
import {AppRoutingModule} from "./app-routing.module";
import {PersonModule} from "./person/person.module";
import { AppComponent }   from './app.component';

import {UserService} from "./services/user.service";
import {ContactModule} from "./contact/contact.module";
import {CoreModule} from "./core/core.module";
import {WikipediaService} from "./wiki/wikipedia.service";
import {WikiComponent} from "./wiki/wikipedia.component";
import {LoginRoutingModule} from "./login/login-routing.module";
import {LoginComponent} from "./login/login.component";
import {ListingModule} from "./listing/listing.module";
import {ListingService} from "./listing/listing.service";
import './rxjs-extensions';
import {InfiniteScrollModule} from "angular2-infinite-scroll";


@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, JsonpModule,InfiniteScrollModule,
        CoreModule.forRoot({userName: 'Mr John'}),
        AppRoutingModule, LoginRoutingModule, PersonModule,ContactModule,ListingModule,
        AppRoutingModule],
    declarations: [ AppComponent,LoginComponent],
    providers:    [ UserService,WikipediaService,ListingService],
    bootstrap:    [ AppComponent ]
})


export class AppModule { }