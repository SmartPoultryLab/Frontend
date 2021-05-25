import { NotificationsService } from './../../_services/notification.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthenticationService } from "../../_services";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "register-form",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  @Output() isAuth = new EventEmitter<boolean>();
  model: any = {};
  isValidating = false;
  returnUrl: string;
  isloading = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loader: NgxSpinnerService,
    private notify :NotificationsService
  ) { }

  ngOnInit() {
    console.log('here');
    this.returnUrl =
    this.route.snapshot.queryParams["returnUrl"] || "loading";
  };

  register() {
    this.isValidating = true;
    this.loader.show();
    this.authenticationService.register(this.model).subscribe(
      () => {
        console.log(" next action here ... " );
      },
      error => {
        this.loader.hide();
        this.notify.toast('error',error.error)
        this.isValidating = false;
      },
      ()=>{
        this.isValidating = false;
        this.loader.hide();
        this.isAuth.emit(true);
        this.router.navigate([this.returnUrl]);
      }
    );
  }
}
