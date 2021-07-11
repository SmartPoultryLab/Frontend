import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Password_Parameters, User} from "../../../_models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {APIService} from "../../../_services/api.service";
import {AuthenticationService} from "../../../_services";
import {NotificationsService} from "../../../_services/notification.service";

export interface ProfileDialogData{
  user:User,
  isPassword:boolean
}
@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  errorMessage: string;
  file: File = null; // Variable to store avatar file
  displayMessage: { [key: string]: string } = {};
  userForm: FormGroup;
  model:Password_Parameters = <Password_Parameters>{};
  user: User = <User>{};
  constructor
  (
    private fb: FormBuilder,
    private apiService:APIService,
    private authService:AuthenticationService,
    private notify:NotificationsService,
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileDialogData,
  ) {}

    onNoClick($event?:any): void {
      $event.preventDefault();
      this.dialogRef.close();
    }
  saveProfile(){
    if (this.userForm.dirty && this.userForm.valid) {
      // Copy the form values over the owner object values
      let user:User = Object.assign({}, this.user, this.userForm.value);
      if (this.file){
          let reader = new FileReader();
          reader.readAsDataURL(this.file);
          reader.onload = () =>{
            user.avatarUrl = {
              file_type : this.file.type,
              contents: reader.result.toString()
            }
            this.apiService
              .updateUser(user)
              .subscribe(
                () => this.onSaveComplete(),
                (error: any) => (this.errorMessage = <any>error)
              );
          }
      } else {
        this.apiService
          .updateUser(user)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => (this.errorMessage = <any>error)
          );
      }
    } else if (!this.userForm.dirty && this.userForm.valid) {
      this.onSaveComplete();
    }
  }
  onSaveComplete(): void {
    this.apiService.getUser().subscribe(user=>{
      this.authService.updateUserData(user);
      window.location.reload();
      this.resetAll();
    },error => {
      this.errorMessage = <any>error
    });
  }

  resetAll():void{
    this.file=null;
    this.userForm.reset();
    this.dialogRef.close();
  }

  savePassword(){
    this.apiService.ChangePassword(this.model).subscribe(()=>{
      this.resetAll();
      this.notify.toast('success','Password Changed Please Login');
      this.authService.logout()
    },error => {
      this.errorMessage = <any>error
      this.notify.toast('error', <string>error);
    })
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      avatar: ["", ],
      fullName: ["", [Validators.required,Validators.minLength(6)]],
      email: ["", [Validators.required,Validators.email]],
    });
    this.userForm.patchValue({
      fullName: this.data.user.fullName,
      email: this.data.user.email,
    });
  }
  onChange(event) {
    this.file = event.target.files[0];
  }

}
