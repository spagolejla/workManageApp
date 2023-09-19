import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Store } from '@ngrx/store';

import * as sharedActions from '../../../root-store/shared-store/actions';
import * as sharedSelectors from '../../../root-store/shared-store/selectors';
import { SharedState } from 'src/app/root-store/shared-store';
import { TaskPerProjectReport } from '../../models/tasks-per-project-report.model';
import { tap } from 'rxjs';
import { PdfService } from 'src/app/shared/services/pdf.service';

@Component({
  selector: 'app-progress-on-projects-report',
  templateUrl: './progress-on-projects-report.component.html',
  styleUrls: ['./progress-on-projects-report.component.scss']
})
export class ProgressOnProjectsReportComponent implements OnInit {
  @ViewChild('exportContent', { static: false }) exportContent!: ElementRef;
  projectData = [
    { name: 'Project A', finishedTasks: 10, unfinishedTasks: 5 },
    { name: 'Project B', finishedTasks: 8, unfinishedTasks: 2 },
    { name: 'Project C', finishedTasks: 5, unfinishedTasks: 7 },
    { name: 'Project C', finishedTasks: 5, unfinishedTasks: 7 },
    { name: 'Project C', finishedTasks: 5, unfinishedTasks: 7 },
    { name: 'Project C', finishedTasks: 5, unfinishedTasks: 7 },
    { name: 'Project C', finishedTasks: 5, unfinishedTasks: 7 },
    { name: 'Project C', finishedTasks: 5, unfinishedTasks: 7 },
    { name: 'Project C', finishedTasks: 5, unfinishedTasks: 7 },
    // Add more project data as needed
  ];
  projectChartData: ChartData[] = [];

  constructor(
    private store$: Store<SharedState.State>,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.projectData.forEach(project => {
      const chartData: ChartData = {
        labels: ['Finished', 'Unfinished'],
        datasets: [
          {
            data: [project.finishedTasks, project.unfinishedTasks],
          }
        ]
      };
      this.projectChartData.push(chartData);
    });
  
  }

  exportToPdf() {
    const content = this.exportContent.nativeElement;
    this.pdfService.generatePdf(content);
  }

}
