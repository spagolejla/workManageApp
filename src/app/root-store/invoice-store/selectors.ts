import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import { selectRouteParams } from "../router-selectors";

export const selectInvoiceState = createFeatureSelector<State>('invoices');

const getSearchValue = (state: State): string => state.searchValue;
export const selectSearchValue = createSelector(selectInvoiceState, getSearchValue);


const getInvoices = (state: State): any[] => {
    return state.invoices;
}
export const selectInvoices = createSelector(selectInvoiceState, getInvoices);


export const selectFilteredInvoices = createSelector(
    selectSearchValue,
    selectInvoices,
    (searchValue, invoices) => {
        if (searchValue != "") {
            return invoices.filter(invoice => invoice.title?.toLocaleLowerCase().indexOf(searchValue?.toLocaleLowerCase()) != -1)
        }
        return invoices;
    }
);

export const selectInvoicesByEmployeeById = (id: string | null) => createSelector(
    selectFilteredInvoices,
    (invoices) => invoices.filter(invoice => invoice.assigner.id == id)
);

export const selectFilteredInvoicesDesc = createSelector(
    selectFilteredInvoices,
    (invoices) => {
        return [...invoices].sort((a, b) => b.invoiceNo - a.invoiceNo);
    }
);

export const selectedInvoice = createSelector(
    selectInvoices,
    selectRouteParams,
    (invoices, routerParams) => {
        const id = routerParams && routerParams["id"]
        return invoices && invoices.find(x => x.id == id);
    }
);

export const selectedInvoiceFromState = createSelector(
    selectInvoiceState,
    (state) => {
        return state.selectedInvoice;
    }
);

const getEmployeeInvoices = (state: State): any[] => {
    return state.employeeInvoices;
}
export const selectEmployeeInvoices = createSelector(selectInvoiceState, getEmployeeInvoices);


