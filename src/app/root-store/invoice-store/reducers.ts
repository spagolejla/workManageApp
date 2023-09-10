import { Action, createReducer, on } from "@ngrx/store";
import { initialState, State } from "./state";
import * as actions from './actions';


const deviceReducer = createReducer (
    initialState,
    on(actions.loadDataSuccess, (state: State, { invoices }) => {
      const tmpState = { ... state };
      tmpState.invoices = invoices
      return tmpState;
    }),
    on(actions.setSearchValue, (state: State, { searchValue }) => {
      const tmpState = { ... state };
      tmpState.searchValue = searchValue
      return tmpState;
    }),
    on(actions.setSelectedInvoice, (state: State, { invoice }) => {
      const tmpState = { ... state };
      tmpState.selectedInvoice = invoice
      return tmpState;
    }),
    on(actions.loadInvoicesByUserSuccess, (state: State, { invoices }) => {
      const tmpState = { ... state };
      tmpState.employeeInvoices = invoices
      return tmpState;
    }),
);

export function reducer(state: State | undefined, action: Action ) {
    return deviceReducer(state, action)
}