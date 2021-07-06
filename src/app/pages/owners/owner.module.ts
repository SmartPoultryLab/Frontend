import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { OrderListComponent } from "./owner-list.component";
import { OrderDetailGuard, OrderEditGuard } from "./owner-guard.service";
import { OwnerFormComponent } from "./owner-form.component";
import { ProductDialogComponent } from "./product-dialog.component";

import { OrderService } from "./owner.service";
import { SharedModule } from "../../shared/shared.module";
import { MaterialModule } from "../../shared";
import { FarmService } from '../farm';
import { InspectionService } from '../inspection';
@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "", component: OrderListComponent },
      {
        path: "edit/:id",
        canDeactivate: [OrderEditGuard],
        component: OwnerFormComponent
      }
    ])
  ],
  declarations: [
    OrderListComponent,
    OwnerFormComponent,
    ProductDialogComponent
  ],
  providers: [
    OrderService,
    OrderDetailGuard,
    OrderEditGuard,
    FarmService,
    InspectionService
  ],
  exports: [
    OrderListComponent,
    OwnerFormComponent
  ]
})
export class OrderModule { }
