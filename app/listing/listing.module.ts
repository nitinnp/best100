import { NgModule }            from '@angular/core';
import { ListingComponent }       from './listing.component';

import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {ListingRoutingModule} from "./listing-routing.module";
import {TooltipModule} from "ng2-tooltip";

@NgModule({
    imports: [ SharedModule, ListingRoutingModule, TooltipModule],
    declarations: [
        ListingComponent
    ],
    exports:      [ ListingComponent ]
})
export class ListingModule { }
