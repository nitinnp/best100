import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { AdminComponent }           from './admin.component';
import { AdminDashboardComponent }  from './admin-dashboard.component';
import { ManagePersonComponent }    from './manage-person.component';
import { ManageContactsComponent }    from './manage-contact.component';
import { AdminRoutingModule }       from './admin-routing.module';
@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        AdminDashboardComponent,
        ManagePersonComponent,
        ManageContactsComponent
    ]
})
export class AdminModule {}