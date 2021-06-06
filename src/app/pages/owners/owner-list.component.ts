import { APIService } from 'src/app/_services/api.service';
import { Component, OnInit, ViewChild } from "@angular/core";

import { IOrder } from "./owner";
import { OrderService } from "./owner.service";
import { PagerService } from "../../_services";
import { ConfirmDialog } from "../../shared";
import * as _ from "lodash";
import {MatSnackBar} from '@angular/material/snack-bar';

import {MatDialog} from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Owner } from 'src/app/_models/Owner';
@Component({
  selector: 'order-list',
  templateUrl: "./owner-list.component.html",
  styleUrls: ["./owner-list.component.css"],
  providers: [ConfirmDialog]
})
export class OrderListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageTitle: string = "Owners";

  showImage: boolean = false;
  listFilter: any = {};
  errorMessage: string;
  owners: Owner[];
  ownerList: Owner[]; //
  displayedColumns = ["name", "phone", "address", "id"];
  dataSource: any = null; // new MatTableDataSource<Element>(ELEMENT_DATA);
  pager: any = {};
  pagedItems: any[];
  totalAmount: number;
  searchFilter: any = {
    name: "",
    phone: "",
  };
  selectedOption: string;



  constructor(
    private orderService: OrderService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private api:APIService
  ) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  freshDataList(owners: Owner[]) {
    this.owners = owners;
    this.ownerList = owners;
    this.totalAmount = this.owners.length;
    this.dataSource = new MatTableDataSource(this.ownerList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
     this.api.getOwners().subscribe(Owners => {
       this.freshDataList(Owners);
     });
    this.searchFilter = {};
    this.listFilter = {};
  }

  getOrders(pageNum?: number) {
    this.api.getOwners().subscribe(owners => {
      this.freshDataList(owners);

    }, error => (this.errorMessage = <any>error));
  }

  searchOrders(filters: any) {
    if (filters) {
      this.api.getOwners().subscribe(owners => {
        this.owners = owners;
        console.log(this.owners.length);
        this.owners = this.owners.filter((owner: Owner) => {
          let match = true;

          Object.keys(filters).forEach(k => {
            match =
              match && filters[k]
                ? owner[k]
                  .toLocaleLowerCase()
                  .indexOf(filters[k].toLocaleLowerCase()) > -1
                : match;
          })

          this.freshDataList(owners);
          return match;
        });
      }, error => (this.errorMessage = <any>error));
    }
  }

  resetListFilter() {
    this.listFilter = {};
    this.getOrders();
  }

  reset() {
    this.listFilter = {};
    this.searchFilter = {};

    this.getOrders();
  }

  resetSearchFilter(searchPanel: any) {
    searchPanel.toggle();
    this.searchFilter = {};

    this.getOrders();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1500
    });
  }

  openDialog(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialog, {
      data: { title: "Dialog", message: "Are you sure to delete this item?" }
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;

      if (this.selectedOption === dialogRef.componentInstance.ACTION_CONFIRM) {
        this.orderService.deleteOrder(id).subscribe(
          () => {
            this.api.getOwners().subscribe(owners => {
              this.freshDataList(owners);
            }, error => (this.errorMessage = <any>error));
            this.openSnackBar("The item has been deleted successfully. ", "Close");
          },
          (error: any) => {
            this.errorMessage = <any>error;
            console.log(this.errorMessage);
            this.openSnackBar(
              "This item has not been deleted successfully. Please try again.",
              "Close"
            );
          }
        );
      }
    });
  }
}
