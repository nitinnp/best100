import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PersonDetailComponent} from "./personDetail/person-detail.component";
import {PersonComponent} from "./person.component";
import {CanDeactivateGuard} from "../can-deactivate-guard.service";



@NgModule({
    imports: [RouterModule.forChild([
        { path: 'dashboard',  component: DashboardComponent },
        { path: 'detail/:id', component: PersonDetailComponent,canDeactivate: [CanDeactivateGuard] },
        { path: 'person',     component: PersonComponent },
    ])],
    exports: [RouterModule],
    providers: [
        CanDeactivateGuard
    ]
})
export class PersonRoutingModule {}