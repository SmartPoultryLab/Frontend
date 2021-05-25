import { SummaryObj } from './../../_models/Summary';
/**
 * Angular  decorators and services
 */
import {
  Component,
  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { APIService } from 'src/app/_services/api.service';


/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'dashboard',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  colNum: number = 4;
  rowHeight = '120px';
  chartColNum = 2;
  chartRowHeight = '450px';
  cardClass = 'dash-card';

  mediaQueryList: any = null;
  mediaQueryMin: any = null;
  isMobile = false;
  chartColspan = 1;
  infoBoxes: SummaryObj[] = [];

  constructor(private breakpointObserver: BreakpointObserver,private api:APIService) {
    breakpointObserver.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.onScreensizeChange();
    });
  }
  ngOnInit() {
    this.api.getDashBoardSummary().subscribe(summaryList => {
      this.infoBoxes = summaryList;
    });
  }



  lineChartData: Array<number[]> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  lineChartLabels: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  lineChartType: string = 'line';
  pieChartType: string = 'pie';

  lineChartOptions: any = {};

  // Pie
  pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  pieChartData: number[] = [300, 500, 100];

  randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
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
        // this.fieldColspan = 12;
        this.colNum = 1;
        this.chartColNum = 1;
        this.chartColspan = 1;
      }
      else {
        this.colNum = 2;
        this.chartColNum = 1;
        this.chartColspan = 2;
      }
    }
    else {
      this.colNum = 4;
      this.chartColNum = 2;
      this.chartColspan = 2;

    }
  }
}
