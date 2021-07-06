import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { InspectionFormComponent } from './inspection-form.component';

@Injectable()
export class ProductDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid inspection Id');
            // start a new navigation to redirect to list pcustomerId
            this.router.navigate(['/inspections']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export class ProductEditGuard implements CanDeactivate<InspectionFormComponent> {

    canDeactivate(component: InspectionFormComponent): boolean {
        if (component.inspectionForm.dirty) {
            let inspectionID = component.inspection.id || 'New Inspection';
            return confirm(`Navigate away and lose all changes to ${inspectionID}?`);
        }
        return true;
    }
}
