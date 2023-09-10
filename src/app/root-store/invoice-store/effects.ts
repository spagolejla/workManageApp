import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, exhaustMap, map, Observable, of, switchMap } from "rxjs";
import { InvoiceService } from "src/app/invoices/services/invoice.service";
import { ActionTypes, loadDataSuccess, noAction } from "./actions";
import * as invoiceActions from './actions'
import { InvoiceState } from ".";
import { Invoice } from "src/app/invoices/models/invoice.model";


@Injectable()
export class InvoiceEffects {
    constructor(
        private actions$: Actions,
        private invoiceService: InvoiceService,
        private store$: Store<InvoiceState.State>
    ) { }

    loadInvoices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LOAD_DATA_REQUEST),
            switchMap(() => this.invoiceService.getInvoices().pipe(
                map(invoices => loadDataSuccess({ invoices })),
                catchError(() => of(noAction))
            ))
        )
    );

    saveInvoicesRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.SAVE_INVOICE_REQUEST),
            exhaustMap(action =>
                this.invoiceService.createInvoice(action['invoice']).pipe(
                    concatMap((invoice) => {
                        return [
                            invoiceActions.saveInvoiceSuccess({ invoice }),
                            invoiceActions.loadInvoicesByUserRequest({userId: (action['invoice'] as Invoice).employee?.id}),
                        ]
                    }),
                    catchError(error =>
                        of(invoiceActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    updateInvoicesRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.UPDATE_INVOICE_REQUEST),
            exhaustMap(action =>
                this.invoiceService.updateInvoice(action['invoice']).pipe(
                    concatMap((invoice) => {
                        return [
                            invoiceActions.updateInvoiceSuccess({ invoice }),
                            invoiceActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(invoiceActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    deleteInvoicesRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.DELETE_INVOICE_REQUEST),
            exhaustMap(action =>
                this.invoiceService.deleteInvoice(action['invoiceId']).pipe(
                    concatMap((invoice) => {
                        return [
                            invoiceActions.deleteInvoiceSuccess(),
                            invoiceActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(invoiceActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    
    loadEmployeeInvoices$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ActionTypes.LOAD_INVOICES_BY_USER_REQUEST),
        switchMap(action => this.invoiceService.getInvoicesByUser(action['userId']).pipe(
            map(invoices => invoiceActions.loadInvoicesByUserSuccess({ invoices })),
            catchError(() => of(noAction))
        ))
    )
);


}