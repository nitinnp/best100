import { Injectable }           from '@angular/core';
import { CanDeactivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot }  from '@angular/router';

import {PersonDetailComponent} from "./person/personDetail/person-detail.component";

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<PersonDetailComponent> {

    canDeactivate(
        component: PersonDetailComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> | boolean {
        // Get the Crisis Center ID
        console.log(route.params['id']);

        // Get the current URL
        console.log(state.url);
        console.log(component.person.name );
        console.log(component.editName);
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (!component.person || component.person.name === component.editName) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return component.dialogService.confirm('Discard changes?');
    }
}