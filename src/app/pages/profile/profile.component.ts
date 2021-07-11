
import { Component, OnInit, ViewChild } from "@angular/core";
import {AuthenticationService} from "../../_services";


import { ConfirmDialog } from "../../shared";
import {ProfileDialogComponent} from "./profile-dialog/profile-dialog.component";
import {MatDialog} from '@angular/material/dialog';

import {User} from "../../_models";
@Component({
  selector: 'profile',
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  providers: [ConfirmDialog]
})
export class ProfileComponent implements OnInit {
  userInfo:User = <User>{};

  constructor(public dialog: MatDialog,private authService:AuthenticationService) {}

  openProfileDialog(): void {

    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '450px',
      data: {user: this.authService.getUser(), isPassword: false}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }
  doLogout(){
    this.authService.logout();
  }
  openPasswordDialog(): void {

    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '450px',
      data: {user: this.authService.getUser(), isPassword: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }
  ngOnInit() {
    this.userInfo = this.authService.getUser();
  }
}
