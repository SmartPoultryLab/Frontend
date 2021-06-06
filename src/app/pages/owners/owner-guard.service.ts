import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  CanDeactivate
} from "@angular/router";
import { OwnerFormComponent } from "./owner-form.component";

@Injectable()
export class OrderDetailGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      alert("Invalid order Id");
      // start a new navigation to redirect to list pcustomerId
      this.router.navigate(["/orders"]);
      // abort current navigation
      return false;
    }
    return true;
  }
}

@Injectable()
export class OrderEditGuard implements CanDeactivate<OwnerFormComponent> {
  canDeactivate(component: OwnerFormComponent): boolean {
    if (component.ownerForm.dirty) {
      let orderName = component.ownerForm.get("id").value || "New Order";
      return confirm(`Navigate away and lose all changes to ${orderName}?`);
    }
    return true;
  }
}
