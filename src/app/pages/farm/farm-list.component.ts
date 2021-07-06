import { Component, OnInit, ViewChild } from '@angular/core';

import { Farm } from './farm';
import { FarmService } from './farm.service';
import { PagerService } from '../../_services';
import { ConfirmDialog } from '../../shared';
import * as _ from 'lodash';

import {MatDialog} from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'customer-list',
    templateUrl: './farm-list.component.html',
    styleUrls: ['./farm-list.component.css'],
    providers: [ConfirmDialog]
})
export class FarmListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    pageTitle: string = 'Farms';
    imageWidth: number = 30;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    farms: Farm[];
    farmsList: Farm[]; //
    displayedColumns = ["owner_name", "bird_name", "breed_name", "housing_name", "food_name", "farm_name", "num_of_breeds", "start_date","id"];
    dataSource: any = null;
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {
      owner_name: "",
      farm_name: "",
    };
    selectedOption: string;


    constructor(
        private farmService: FarmService,
        // private pagerService: PagerService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    freshDataList(farms: Farm[]) {
        this.farms = farms;
        this.dataSource = new MatTableDataSource(this.farms);
        console.log(this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        this.farmService.getFarms()
            .subscribe(farms => {
                this.freshDataList(farms);
            },
            error => this.errorMessage = <any>error);

        this.searchFilter = {};
        this.listFilter = {};
    }

    getFarms(pageNum?: number) {
        this.farmService.getFarms()
            .subscribe(customers => {
                this.freshDataList(customers);
            },
            error => this.errorMessage = <any>error);
    }

    getDate(date:string):Date{
      return new Date(date);
    }
    searchFarms(filters: any) {
        if (filters) {
            this.farmService.getFarms()
                .subscribe(farms => {
                    this.farms = farms;
                    console.log(this.farms.length)
                    this.farms = this.farms.filter((farm: Farm) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                              farm[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        return match;
                    });
                    this.freshDataList(farms);
                },
                error => this.errorMessage = <any>error);
        }

    }

    resetListFilter() {
        this.listFilter = {};
        this.getFarms();
    }

    reset() {
        this.listFilter = {};
        this.searchFilter = {};
        this.getFarms();

    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};
        this.getFarms();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 1500,
        });
    }

    openDialog(id: number) {
        let dialogRef = this.dialog.open(ConfirmDialog,
            { data: { title: 'Dialog', message: 'Are you sure to delete this item?' } });
        dialogRef.disableClose = true;


        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;

            if (this.selectedOption === dialogRef.componentInstance.ACTION_CONFIRM) {
                this.farmService.deleteFarm(id).subscribe(
                    () => {
                        this.farmService.getFarms()
                            .subscribe(farms => {
                                this.freshDataList(farms);
                            },
                            error => this.errorMessage = <any>error);
                        this.openSnackBar("The item has been deleted successfully. ", "Close");
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        console.log(this.errorMessage);
                        this.openSnackBar("This item has not been deleted successfully. Please try again.", "Close");
                    }
                );
            }
        });
    }



}
