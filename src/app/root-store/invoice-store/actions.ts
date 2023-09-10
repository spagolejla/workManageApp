import { createAction, props } from "@ngrx/store";
import { Invoice } from "src/app/invoices/models/invoice.model";

export enum ActionTypes {
    LOAD_DATA_REQUEST = "[Invoice] Load Data Request",
    LOAD_DATA_SUCCESS = "[Invoice] Load Data Success",
    SET_SEARCH_VALUE = "[Invoice] Set Search Value",
    SET_SELECTED_INVOICE = "[Invoice] Set Selected Invoice",
    SAVE_INVOICE_REQUEST = '[Invoice] Save Invoice Request',
    SAVE_INVOICE_SUCCESS = '[Invoice] Save Invoice Success',
    UPDATE_INVOICE_REQUEST = '[Invoice] Update Invoice Request',
    UPDATE_INVOICE_SUCCESS = '[Invoice] Update Invoice Success',
    DELETE_INVOICE_REQUEST = '[Invoice] Delete Invoice Request',
    DELETE_INVOICE_SUCCESS = '[Invoice] Delete Invoice Success',
    LOAD_INVOICES_BY_USER_REQUEST = "[Invoice] Load Invoices By User Request",
    LOAD_INVOICES_BY_USER_SUCCESS = "[Invoice] Load Invoices By User Success",
    NO_ACTION  = "[Invoice] No Action",
    ERROR  = "[Invoice] ERROR Action",
}

export const loadDataRequest = createAction(ActionTypes.LOAD_DATA_REQUEST);
export const loadDataSuccess = createAction(ActionTypes.LOAD_DATA_SUCCESS, props<  { invoices: Array<Invoice> } >());
export const setSearchValue = createAction(ActionTypes.SET_SEARCH_VALUE, props<  { searchValue: string } >());
export const setSelectedInvoice = createAction(ActionTypes.SET_SELECTED_INVOICE, props<  { invoice: any } >());
export const saveInvoiceRequest = createAction(ActionTypes.SAVE_INVOICE_REQUEST, props<  { invoice: Invoice } >());
export const saveInvoiceSuccess = createAction(ActionTypes.SAVE_INVOICE_SUCCESS, props<  { invoice: Invoice } >());
export const updateInvoiceRequest = createAction(ActionTypes.UPDATE_INVOICE_REQUEST, props<  { invoice: Invoice } >());
export const updateInvoiceSuccess = createAction(ActionTypes.UPDATE_INVOICE_SUCCESS, props<  { invoice: Invoice } >());
export const deleteInvoiceRequest = createAction(ActionTypes.DELETE_INVOICE_REQUEST, props<  { invoiceId: string } >());
export const deleteInvoiceSuccess = createAction(ActionTypes.DELETE_INVOICE_SUCCESS);
export const loadInvoicesByUserRequest = createAction(ActionTypes.LOAD_INVOICES_BY_USER_REQUEST, props<  { userId: string | undefined | null} >());
export const loadInvoicesByUserSuccess = createAction(ActionTypes.LOAD_INVOICES_BY_USER_SUCCESS, props<  { invoices: Array<Invoice> } >());
export const noAction = createAction(ActionTypes.NO_ACTION);
export const errorAction = createAction(ActionTypes.ERROR, props<  { error: any } >());


  