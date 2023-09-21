import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';

import { SharedState } from 'src/app/root-store/shared-store';
import { PdfService } from 'src/app/shared/services/pdf.service';

import * as sharedActions from '../../../root-store/shared-store/actions';
import * as sharedSelectors from '../../../root-store/shared-store/selectors';

@Component({
  selector: 'app-progress-on-projects-report',
  templateUrl: './progress-on-projects-report.component.html',
  styleUrls: ['./progress-on-projects-report.component.scss']
})
export class ProgressOnProjectsReportComponent implements OnInit, OnDestroy {
  @ViewChild('exportContent', { static: false }) exportContent!: ElementRef;

  subscriptions: Array<Subscription> = []
  projectChartData: ChartData[] = [];
  progressOnProjectReportData$ = this.store$.select(sharedSelectors.selectProgressOnProjectReportData);

  constructor(
    private store$: Store<SharedState.State>,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(sharedActions.loadProgressOnProjectReportDataRequest());
    this.subscriptions.push(this.progressOnProjectReportData$.subscribe(reportData => {
      reportData.forEach(project => {
        const chartData: ChartData = {
          labels: ['Finished', 'Unfinished'],
          datasets: [
            {
              data: [project.finishedTasks, project.unfinishedTasks],
              backgroundColor: [
                '#4ec2a4',
                '#dee1e6'
              ],
            }
          ]
        };
        this.projectChartData.push(chartData);
      });
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
