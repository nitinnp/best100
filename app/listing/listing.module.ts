import { NgModule }            from '@angular/core';
import { ListingComponent }       from './listing.component';
import { BrowserModule } from '@angular/platform-browser';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {ListingRoutingModule} from "./listing-routing.module";
import {TooltipModule} from "ng2-tooltip";
import {WikiComponent} from "../wiki/wikipedia.component";
import {InfiniteScrollModule} from "angular2-infinite-scroll";


@NgModule({
    imports: [ BrowserModule,SharedModule,ListingRoutingModule, TooltipModule, InfiniteScrollModule],
    declarations: [
        ListingComponent,WikiComponent
    ],
    exports:      [ ListingComponent ]
})
export class ListingModule { }
