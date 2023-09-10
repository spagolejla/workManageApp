import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { TimesheetStatus } from 'src/app/timesheet/models/timesheet-status.model';
import { Invoice } from '../../models/invoice.model';
import { Timesheet } from 'src/app/timesheet/models/timesheet.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent {

  @ViewChild('printableContent')
  printableContent!: ElementRef;

  @Input() invoice: Invoice | undefined = undefined;

  TimesheetStatus = TimesheetStatus;
  columns = [
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: Timesheet) => `${element.date}`,
    },
    {
      columnDef: 'user',
      header: 'Employee',
      cell: (element: Timesheet) => `${element.user}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: Timesheet) => `${element.status}`,
    },
    {
      columnDef: 'totalHours',
      header: 'Total Hours',
      cell: (element: Timesheet) => `${element.totalHours}`,
    }
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new MatTableDataSource<Timesheet | undefined>(this.invoice?.timesheets);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InvoiceDetailsComponent>,
  ) {
    if (data) {
      this.invoice = data.invoice;
      this.dataSource = new MatTableDataSource<Timesheet | undefined>(this.invoice?.timesheets);
    }
  }

  getContentToPrint(): string {
    return this.printableContent.nativeElement.innerHTML;
  }

  print() {
    this.dialogRef.close(this.invoice);
  }

}
