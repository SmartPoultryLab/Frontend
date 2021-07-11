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
import { InspectionHistoryComponent } from './components/inspection-history/inspection-history.component';
import { InspectionExaminationComponent } from './components/inspection-examination/inspection-examination.component';
import { MultiselectAutocompleteComponent } from './components/multiselect-autocomplete/multiselect-autocomplete.component';

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
    InspectionFormComponent,
    InspectionHistoryComponent,
    InspectionExaminationComponent,
    MultiselectAutocompleteComponent
  ],
  providers: [InspectionService, ProductDetailGuard, ProductEditGuard,FarmService],
  exports: [
    InspectionListComponent,
    InspectionFormComponent,
  ]
})
export class InspectionModule { }
