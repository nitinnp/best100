import {NgModule }             from '@angular/core';
import {RouterModule} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {ManagePersonComponent} from "./manage-person.component";
import {ManageContactsComponent} from "./manage-contact.component";
import {AdminDashboardComponent} from "./admin-dashboard.component";
import {AuthGuard} from "../auth-guard.service";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AdminComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: '',
                        canActivateChild: [AuthGuard],
                        children: [
                            { path: 'persons', component: ManagePersonComponent },
                            { path: 'contacts', component: ManageContactsComponent },
                            { path: '', component: AdminDashboardComponent }
                        ]
                    }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {}
