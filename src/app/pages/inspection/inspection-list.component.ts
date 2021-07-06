import { Component, OnInit, ViewChild } from '@angular/core';

import {Inspection} from './inspection';
import { InspectionService } from './inspection.service';
import { ConfirmDialog } from '../../shared';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {APIService} from "../../_services/api.service";
import {Farm, FarmService} from "../farm";
import {Owner} from "../../_models";
import {Router} from "@angular/router";
import {NotificationsService} from "../../_services/notification.service";


@Component({
    selector: 'product-list',
    templateUrl: './inspection-list.component.html',
    styleUrls: ['./inspection-list.component.css'],
    providers: [ConfirmDialog]
})
export class InspectionListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    pageTitle: string = 'Inspections';

    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    inspections: Inspection[];
    inspectionsList: Inspection[];
    ownersList:Owner[] = [];
    farmsList:Farm[] = [];
    farmsListFilterd:Farm[]=[];
    displayedColumns = ["inspection_date", "current_age", "dead_last_3_days", "average_weight", "id"];
    dataSource: any = null;
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {};
    selectedOption: string;



    constructor(
        private inspectionsService: InspectionService,
        private farmsService:FarmService,
        private apiService:APIService,
        private router:Router,
        private notificationService:NotificationsService,
        public dialog: MatDialog, public snackBar: MatSnackBar) {
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    getDate(date:string):Date{
      return new Date(date);
    }
    manage(inspection_id:number,farm_id:number){
      if (farm_id==0|| !farm_id)
      {this.notificationService.toast('error','Please Select A Farm');}
      else
      {
        let farmData = this.farmsList.find(farm=>farm.id == farm_id);
        farmData.num_of_visits = this.inspections.filter(inspection=> inspection.farm_id == farm_id).length
        this.router.navigate([`/inspections/edit/${inspection_id}`],{state:{ farm:farmData }} );
      }
    }
    freshDataList(inspections: Inspection[]) {
        this.inspections = inspections;

        this.inspectionsList = inspections;

        this.dataSource = new MatTableDataSource(this.inspections);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadOwnerFarms(owner_id:number){
      const farmsList  = [...this.farmsList];
      this.farmsListFilterd = farmsList.filter(farm=>farm.owner_id == owner_id);
    }
    ngOnInit(): void {
        this.apiService.getOwners().subscribe(owners=>this.ownersList = owners, error => this.errorMessage = <any>error);
        this.farmsService.getFarms().subscribe(farms=>farms ? this.farmsList=farms : this.farmsList=[],error => this.errorMessage = <any>error);
        this.inspectionsService.getInspections()
            .subscribe(inspections => {
                this.freshDataList(inspections);
                console.log(inspections);
            },
            error => this.errorMessage = <any>error);

        this.searchFilter = {};
        this.listFilter = {};
    }

    getInspections(pageNum?: number) {
        this.inspectionsService.getInspections()
            .subscribe(inspections => {
                this.freshDataList(inspections);
            },
            error => this.errorMessage = <any>error);
    }
    loadFarmInspections(farm_id:number){
        this.dataSource = new MatTableDataSource(this.inspections.filter(inspection=> inspection.farm_id == farm_id));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    searchInspections(filters: any) {
        if (filters) {
            this.inspectionsService.getInspections()
                .subscribe(inspections => {
                    this.inspections = inspections;
                    console.log(this.inspections.length)
                    this.inspections = this.inspections.filter((inspection: Inspection) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                              inspection[k] && inspection[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        return match;
                    });
                    this.freshDataList(inspections);
                },
                error => this.errorMessage = <any>error);
        }

    }

    resetListFilter() {
        this.listFilter = {};
        this.getInspections();
    }

    reset() {
        this.listFilter = {};
        this.searchFilter = {};
        this.getInspections();
    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};
        this.getInspections();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 1500,
        });
    }

    openDialog(id: number) {
        let dialogRef = this.dialog.open(ConfirmDialog,
            { data: { title: 'Dialog', message: 'Are you sure to delete this Inspection?' } });
        dialogRef.disableClose = true;


        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;

            if (this.selectedOption === dialogRef.componentInstance.ACTION_CONFIRM) {
                this.inspectionsService.deleteInspection(id).subscribe(
                    () => {
                        this.inspectionsService.getInspections()
                            .subscribe(inspection => {
                                this.freshDataList(inspection);
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
