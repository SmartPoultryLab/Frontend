import { APIService } from 'src/app/_services/api.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  ElementRef,

} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,

} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { NumberValidators } from "../../shared/number.validator";
import { GenericValidator } from "../../shared/generic-validator";
import { CustomerService, Customer } from "../customer";
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from "./product-dialog.component";
import { ConfirmDialog } from "../../shared";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Product } from '../product';
import { Owner } from 'src/app/_models/Owner';

@Component({
  selector: 'owner-form',
  templateUrl: "./owner-form.component.html",
  styles: [`
  .title-spacer {
      flex: 1 1 auto;
    }
  .form-field{
      width: 100%;
      margin-left: 20px;
      margin-right: 20px;
    }
    `],
  providers: [ProductDialogComponent]
})
export class OwnerFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  pageTitle: string = "Update Owner";
  errorMessage: string;
  ownerForm: FormGroup;
  owner: Owner = <Owner>{};
  showImage: boolean;
  customers: Customer[];
  fieldColspan = 4;
  add = false;
  // Use with the generic validation messcustomerId class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } } = {
    name: {
      required: "Owner name is required.",
    },
    phone: {
      required: "Owner phone is required.",
      pattern: "Owner Phone must be numbers and 11 digit."
    },
    address: {
      required: "Owner address is required."
    }
  };
  private sub: Subscription;
  private genericValidator: GenericValidator;



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api :APIService,
    private customerService: CustomerService,
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.onScreensizeChange();
    });

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
      name: ["", [Validators.required]],
      phone: ["", [Validators.required,Validators.pattern("[0-9 ]{11}")]],
      address: ["", [Validators.required]],
    });

    // Read the owner Id from the route parameter
    this.sub = this.route.params.subscribe(params => {
      let id = +params["id"];
      this.getowner(id);
    });

    this.getCustomers();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) =>
        Observable.fromEvent(formControl.nativeElement, "blur")
    );

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.ownerForm.valueChanges, ...controlBlurs)
      .debounceTime(800)
      .subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(
          this.ownerForm
        );
      });
  }

  getowner(id: number): void {
    this.api
      .getOwnerById(id)
      .subscribe(
        (owner: Owner) => this.onOwnerRetrieved(owner),
        (error: any) => (this.errorMessage = <any>error)
      );
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
    }, error => (this.errorMessage = <any>error));
  }

  onOwnerRetrieved(owner: Owner): void {
    if (this.ownerForm) {
      this.ownerForm.reset();
    }
    this.owner = owner;

    if (this.owner.id === 0) {
      this.pageTitle = "Add Owner";
      this.add = true;
    } else {
      this.pageTitle = `Update Owner: ${this.owner.name} `;
    }

    // Update the data on the form
    this.ownerForm.patchValue({
      name: this.owner.name,
      number: this.owner.number,
      address: this.owner.address,
    });

  }

  saveowner(): void {
    if (this.ownerForm.dirty && this.ownerForm.valid) {
      // Copy the form values over the owner object values
      const owner = Object.assign({}, this.owner, this.ownerForm.value);

      this.api
        .manageOwner(owner,this.add)
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => (this.errorMessage = <any>error)
        );
    } else if (!this.ownerForm.dirty && this.ownerForm.valid) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.ownerForm.reset();
    this.router.navigate(["/owners"]);
  }

  addProduct(event: any): void {


    let dialogRef = this.dialog.open(ProductDialogComponent, {
      height: "400px",
      width: "600px",
      data: { title: "Dialog" }// message: "Are you sure to add this item?" }
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      // this.selectedOption = result;
      if (result === dialogRef.componentInstance.ACTION_SAVE) {
        //     this.ownerService.deleteowner(id).subscribe(
        //         () => {
        //             this.ownerService.getowners()
        //                 .subscribe(owners => {
        //                     this.owners = owners;
        //                     this.setPage(1);
        //                 },
        //                 error => this.errorMessage = <any>error);
        //         },
        //         (error: any) => {
        //             this.errorMessage = <any>error;
        //             console.log(this.errorMessage);
        //             this.openSnackBar("This item has not been deleted successfully. Please try again.", "Close");
        //         }
        //     );
      }
    });
    event.preventDefault();
  }


  openDialog(product: Product) {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      data: { title: "Dialog", message: "Are you sure to delete this item?" }
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(() => {
      // this.selectedOption = result;

      // if (this.selectedOption === dialogRef.componentInstance.ACTION_CONFIRM) {
      //   this.ownerService.deleteowner(id).subscribe(
      //     () => {
      //       this.ownerService.getowners().subscribe(owners => {
      //         this.freshDataList(owners);
      //       }, error => (this.errorMessage = <any>error));
      //       this.openSnackBar("The item has been deleted successfully. ", "Close");
      //     },
      //     (error: any) => {
      //       this.errorMessage = <any>error;
      //       console.log(this.errorMessage);
      //       this.openSnackBar(
      //         "This item has not been deleted successfully. Please try again.",
      //         "Close"
      //       );
      //     }
      //   );
      // }
    });
  }

  onScreensizeChange() {
    // debugger
    const isLess600 = this.breakpointObserver.isMatched('(max-width: 599px)');
    const isLess1000 = this.breakpointObserver.isMatched('(max-width: 959px)');
    console.log(
      ` isLess600  ${isLess600}
        isLess1000 ${isLess1000}  `
    )
    if (isLess1000) {
      if (isLess600) {
        this.fieldColspan = 12;
      }
      else {
        this.fieldColspan = 6;
      }
    }
    else {
      this.fieldColspan = 3;
    }
  }
  deleteProduct(): void { }
}
