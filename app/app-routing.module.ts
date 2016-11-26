import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {WikiComponent} from "./wiki/wikipedia.component";
import {ListingComponent} from "./listing/listing.component";

const routes: Routes = [
    { path: 'admin',    loadChildren: 'app/admin/admin.module#AdminModule'},
    { path: '', redirectTo: 'listing/amz-Laptops', pathMatch: 'full' },
    { path: 'wiki',     component: WikiComponent },
    { path: 'listing/:id',     component: ListingComponent,pathMatch: 'prefix' }

];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}