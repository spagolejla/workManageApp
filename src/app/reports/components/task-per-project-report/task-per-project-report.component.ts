import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';

import { SharedState } from 'src/app/root-store/shared-store';
import { TaskPerProjectReport } from '../../models/tasks-per-project-report.model';
import { PdfService } from 'src/app/shared/services/pdf.service';

import * as sharedActions from '../../../root-store/shared-store/actions';
import * as sharedSelectors from '../../../root-store/shared-store/selectors';

@Component({
  selector: 'app-task-per-project-report',
  templateUrl: './task-per-project-report.component.html',
  styleUrls: ['./task-per-project-report.component.scss']
})
export class TaskPerProjectReportComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChild('exportContent', { static: false }) exportContent!: ElementRef;
  taskPerProjectReportData: Array<TaskPerProjectReport> = [];

  public barChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: { display: true },
    },
  };
  public barChartLabels: string[] = []
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: this.taskPerProjectReportData.map(data => data.numberOfTasks),
        label: 'Number of tasks',
        backgroundColor: '#F6D155',
      },
    ],
  };

  taskPerProjectReportData$ = this.store$.select(sharedSelectors.selectTaskPerProjectReportData).pipe(
    tap(reportData => {
      this.barChartLabels = reportData.map(x => x.projectName);
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            data: reportData.map(data => data.numberOfTasks),
            label: 'Number of Tasks',
            backgroundColor: '#4AC09D',
          },
        ],
      };
      return this.taskPerProjectReportData = reportData;
    })
  );

  subscriptions: Array<Subscription> = []

  constructor(
    private store$: Store<SharedState.State>,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(sharedActions.loadTaskPerprojectReportDataRequest());
    this.initializeChart();
  }

  initializeChart() {
    this.subscriptions.push(this.taskPerProjectReportData$.subscribe(reportData => {
      this.barChartLabels = reportData.map(data => data.projectName);
      this.barChartData.datasets[0].data = reportData.map(data => data.numberOfTasks);
    }));
  }

  exportToPdf() {
    const content = this.exportContent.nativeElement;
    this.pdfService.generatePdf(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

}