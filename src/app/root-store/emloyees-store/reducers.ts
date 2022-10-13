import { Action, createReducer, on } from "@ngrx/store";
import { initialState, State } from "./state";
import * as actions from './actions';


const deviceReducer = createReducer (
    initialState,
    on(actions.loadDataSuccess, (state: State, { employees }) => {
      const tmpState = { ... state };
      tmpState.employees = employees
      return tmpState;
    }),
    on(actions.setSearchValue, (state: State, { searchValue }) => {
      const tmpState = { ... state };
      tmpState.searchValue = searchValue
      return tmpState;
    }),
    on(actions.setSelectedEmployee, (state: State, { employee }) => {
      const tmpState = { ... state };
      tmpState.selectedEmployee = employee
      return tmpState;
    }),
);

export function reducer(state: State | undefined, action: Action ) {
    return deviceReducer(state, action)
}