import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

import { Invoice } from '../../models/invoice.model';
import { InvoiceManageComponent } from '../invoice-manage/invoice-manage.component';
import { InvoiceState } from 'src/app/root-store/invoice-store';
import { Timesheet } from 'src/app/timesheet/models/timesheet.model';
import { Employee } from 'src/app/employee/models/employee.model';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';

import * as invoiceActions from '../../../root-store/invoice-store/actions';
import * as invoiceSelectors from '../../../root-store/invoice-store/selectors';
import * as timesheetSelectors from '../../../root-store/timesheet-store/selectors';


@Component({
  selector: 'ewm-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @Input() selectedEmployee: Employee | undefined = undefined;
  invoices$ = this.store$.select(invoiceSelectors.selectEmployeeInvoices);
  timesheets$ = this.store$.select(timesheetSelectors.selectEmployeeTimesheets);

  columns = [
    {
      columnDef: 'month',
      header: 'Month',
      cell: (element: Invoice) => `${element.month}`,
    },
    {
      columnDef: 'date',
      header: 'Date',
      cell: (element: Invoice) => `${element.date}`,
    },
    {
      columnDef: 'employee',
      header: 'Employee',
      cell: (element: Invoice) => `${element.employee}`,
    },
    {
      columnDef: 'totalHours',
      header: 'Total Hours',
      cell: (element: Invoice) => `${element.totalHours}`,
    },
    {
      columnDef: 'totalCost',
      header: 'Total Cost',
      cell: (element: Invoice) => `${element.totalHours}`,
    },
    {
      columnDef: 'numberOfDays',
      header: 'Number of days',
      cell: (element: Invoice) => `${element.timesheets?.length}`,
    },
    {
      columnDef: 'actions',
      header: 'Actions',
    },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  userId = this.route.snapshot.paramMap.get('id');


  constructor(
    private store$: Store<InvoiceState.State>,
    public router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(invoiceActions.loadInvoicesByUserRequest({ userId: this.userId }));
    this.invoices$.subscribe(value => console.log(value))
  }

  addNewInvoice(timesheets: Array<Timesheet>) {
    const dialogRef = this.dialog.open(InvoiceManageComponent, {
      data: {
        timesheets,
        salaryPerHour: this.selectedEmployee ? this.selectedEmployee.salaryPerHour : 0,
        employee: { id: this.selectedEmployee?.id, name: this.selectedEmployee?.firstName + ' ' + this.selectedEmployee?.lastName }
      },
    });

    dialogRef.afterClosed().subscribe(invoice => {
      this.store$.dispatch(invoiceActions.saveInvoiceRequest({ invoice }))
    });
  }

  openDetails(invoice: Invoice) {
    const dialogRef = this.dialog.open(InvoiceDetailsComponent, {
      data: {
        invoice
      },
    });

    dialogRef.afterClosed().subscribe(invoice => {
      if (invoice) {
        this.printDialogContent(dialogRef.componentInstance);
      }
    });
  }

  printDialogContent(printableComponent: InvoiceDetailsComponent): void {
    const contentToPrint = printableComponent.getContentToPrint();

    const printWindow = window.open('', '', '');

    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <body>
            ${contentToPrint}
          </body>
        </html>
      `);
      printWindow.document.close();

      printWindow.print();
      printWindow.close();
    }
  }
}
