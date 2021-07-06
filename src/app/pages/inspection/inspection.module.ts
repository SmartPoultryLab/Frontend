import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { InspectionListComponent } from "./inspection-list.component";
import { ProductDetailGuard, ProductEditGuard } from "./inspection-guard.service";
import { InspectionFormComponent } from "./inspection-form.component";

import { InspectionService } from "./inspection.service";
import { SharedModule } from "../../shared/shared.module";
import { MaterialModule } from "../../shared/material.module";
import { FarmService} from "../farm";

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "", component: InspectionListComponent },
      {
        path: "edit/:id",
        canDeactivate: [ProductEditGuard],
        component: InspectionFormComponent
      }
    ])
  ],
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    InspectionListComponent,
    InspectionFormComponent
  ],
  providers: [InspectionService, ProductDetailGuard, ProductEditGuard,FarmService],
  exports: [
    InspectionListComponent,
    InspectionFormComponent,
  ]
})
export class InspectionModule { }
