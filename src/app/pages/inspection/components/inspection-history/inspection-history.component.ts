import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Inspection} from "../../inspection";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
@Component({
  selector: 'app-inspection-history',
  templateUrl: './inspection-history.component.html',
  styleUrls: ['./inspection-history.component.scss']
})
export class InspectionHistoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() Inspections: Inspection[]=[];

  displayedColumns = ["inspection_date", "current_age", "dead_last_3_days", "feed_consumption","water_consumption","average_weight","diagnoses"];
  dataSource: any = null;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.Inspections);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.Inspections);
  }
  getDate(date:string):Date{
    return new Date(date);
  }

}
