import { NgModule }             from '@angular/core';
import { RouterModule } from '@angular/router';
import {ContactComponent} from "./contact.component";
import {AuthGuard} from "../auth-guard.service";


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'contact', component: ContactComponent ,  canActivate: [AuthGuard]}
    ])],
    exports: [RouterModule]
})
export class ContactRoutingModule {}