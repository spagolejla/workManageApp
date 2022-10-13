import { Action, createReducer, on } from "@ngrx/store";
import { initialState, State } from "./state";
import * as actions from './actions';


const deviceReducer = createReducer (
    initialState,
    on(actions.loadDataSuccess, (state: State, { timesheets }) => {
      const tmpState = { ... state };
      tmpState.timesheets = timesheets
      return tmpState;
    }),
    on(actions.setSearchValue, (state: State, { searchValue }) => {
      const tmpState = { ... state };
      tmpState.searchValue = searchValue
      return tmpState;
    }),
    on(actions.setSelectedTimesheet, (state: State, { timesheet }) => {
      const tmpState = { ... state };
      tmpState.selectedTimesheet = timesheet
      return tmpState;
    }),
);

export function reducer(state: State | undefined, action: Action ) {
    return deviceReducer(state, action)
}