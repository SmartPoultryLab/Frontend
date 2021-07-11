import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { ProfileService } from "./profile.service";
import { SharedModule } from "../../shared/shared.module";
import { MaterialModule } from "../../shared";
import {AuthenticationService} from "../../_services";
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import {FormsModule} from "@angular/forms";
@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild([
      { path: "", component: ProfileComponent }
    ])
  ],
  declarations: [
    ProfileComponent,
    ProfileDialogComponent,
  ],
  providers: [
    ProfileService,
    AuthenticationService,
  ],
  exports: [
    ProfileComponent,
    ProfileDialogComponent,
  ]
})
export class ProfileModule { }
