import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FarmListComponent } from "./farm-list.component";
import {
  CustomerDetailGuard,
  CustomerEditGuard
} from "./farm-guard.service";
import { FarmFormComponent } from "./farm-form.component";

import { FarmService } from "./farm.service";
import { SharedModule } from "../../shared/shared.module";

import { MaterialModule } from "../../shared/material.module";


@NgModule({
  imports: [
    SharedModule,
    // ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "", component: FarmListComponent },
      {
        path: "new/",
        canDeactivate: [CustomerEditGuard],
        component: FarmFormComponent
      },
      {
        path: "edit/:id",
        canDeactivate: [CustomerEditGuard],
        component: FarmFormComponent
      }
    ])
  ],
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    FarmListComponent,
    FarmFormComponent
  ],
  providers: [FarmService, CustomerDetailGuard, CustomerEditGuard,
  ],
  // entryComponents: [MatOption],
  exports: [
    FarmListComponent,
    FarmFormComponent,

  ]
})
export class FarmModule { }
