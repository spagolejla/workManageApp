import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Store } from '@ngrx/store';

import * as employeeSelectors from '../../../root-store/emloyees-store/selectors';
import * as employeeActions from '../../../root-store/emloyees-store/actions';

import { PdfService } from 'src/app/shared/services/pdf.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-activity-report',
  templateUrl: './user-activity-report.component.html',
  styleUrls: ['./user-activity-report.component.scss']
})
export class UserActivityReportComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('exportContent', { static: false }) exportContent!: ElementRef;
  userActivityChartData: Array<number> = [];

  public chartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: { display: true },
    },
  };
  public chartLabels: string[] = []
  public chartType: ChartType = 'doughnut';

  public chartData: ChartData<'doughnut'> = {
    labels: [
      'Active',
      'Inactive',
    ],
    datasets: [
      {
        data: this.userActivityChartData,
        label: 'Test',
        backgroundColor: [
          '#4ec2a4',
          '#dee1e6'
        ],
      },
    ],
  };

  userActivityChartData$ = this.store$.select(employeeSelectors.selecteActiveVsNeactiveEmployeesReportData).pipe(
    tap(reportData => {
   
     
       this.chartData = {
         labels: ['Active', 'Inactive'],
         datasets: [
           {
             data: reportData,
             backgroundColor: [
              '#4ec2a4',
              '#dee1e6'
            ],
           },
         ],
       };
       return this.userActivityChartData = reportData;
    })
  );

  constructor(
    private store$: Store<any>,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(employeeActions.loadDataRequest());
    this.initializeChart();

  }


  initializeChart() {
    this.userActivityChartData$.subscribe(reportData => {
      this.chartData.datasets[0].data = reportData;
    });
  }

  exportToPdf() {
    const content = this.exportContent.nativeElement;
    this.pdfService.generatePdf(content);
  }

}
