import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimesheetStatus } from 'src/app/timesheet/models/timesheet-status.model';
import { Timesheet } from 'src/app/timesheet/models/timesheet.model';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-manage',
  templateUrl: './invoice-manage.component.html',
  styleUrls: ['./invoice-manage.component.scss']
})
export class InvoiceManageComponent implements OnInit {

  timesheets: Array<Timesheet> = [];
  filteredTimesheets: Array<Timesheet> = [];
  selectedMonthControl = new FormControl();
  invoice: Invoice | undefined = undefined;
  salaryPerHour = 0;
  employee = {};
  months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' },
  ];

  timesheetsValid = false;

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InvoiceManageComponent>,
  ) {
    if (data) {
      this.timesheets = data.timesheets;
      this.salaryPerHour = data.salaryPerHour;
      this.employee = data.employee
    }
  }

  ngOnInit(): void {
    this.selectedMonthControl.valueChanges.subscribe(month => {
      this.filteredTimesheets = this.timesheets.filter(x => x.date && new Date(x.date).getMonth() + 1 == month?.id);
      this.timesheetsValid = this.filteredTimesheets.length > 0 && this.filteredTimesheets.every(timesheet => timesheet.status == TimesheetStatus.Approved)
      if (this.timesheetsValid) {
        let totalHours = this.filteredTimesheets.reduce((total, timesheet) => {
          if (timesheet.totalHours !== undefined) {
            return total + timesheet.totalHours;
          }
          return total;
        }, 0);

        let totalCost = totalHours * this.salaryPerHour;

        this.invoice = {
          id: "",
          date: new Date(),
          month: month.name,
          timesheets: this.filteredTimesheets,
          totalHours,
          totalCost: totalCost,
          employee: this.employee
        } as Invoice
      }
    })
  }

  create() {
    if (this.timesheetsValid) {
      this.dialogRef.close(this.invoice);
    }
  }

}
