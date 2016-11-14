import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { PersonComponent }       from './person.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PersonDetailComponent} from "./personDetail/person-detail.component";
import {PersonService} from "./person.service";
import {PersonSearchComponent} from "./personSearch/person-search.component";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {PersonRoutingModule} from "./person-routing.module";
import {DialogService} from "../dialog.service";

@NgModule({
    imports: [ SharedModule, CoreModule,PersonRoutingModule],
    declarations: [
        PersonComponent, DashboardComponent,PersonDetailComponent, PersonSearchComponent
    ],
    exports:      [ PersonComponent ],
    providers:    [ PersonService ,DialogService]
})
export class PersonModule { }
