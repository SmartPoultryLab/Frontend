import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { FarmFormComponent } from './farm-form.component';

@Injectable()
export  class CustomerDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid farm Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/farms']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export  class CustomerEditGuard implements CanDeactivate<FarmFormComponent> {

    canDeactivate(component: FarmFormComponent): boolean {
        if (component.farmForm.dirty) {
            let farmName = component.farmForm.get('farm_name').value || 'New Farm';
            return confirm(`Navigate away and lose all changes to ${farmName}?`);
        }
        return true;
    }
}
