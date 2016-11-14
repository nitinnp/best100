import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListingComponent} from "./listing.component";
import {CanDeactivateGuard} from "../can-deactivate-guard.service";



@NgModule({
    imports: [RouterModule.forChild([
        { path: 'listing', component: ListingComponent},
    ])],
    exports: [RouterModule],
    providers: [
        CanDeactivateGuard
    ]
})
export class ListingRoutingModule {}