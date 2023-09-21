import { Action, createReducer, on } from "@ngrx/store";
import { initialState, State } from "./state";
import * as actions from './actions';


const deviceReducer = createReducer(
  initialState,
  on(actions.setLoggedUser, (state: State, { user }) => {
    const tmpState = { ...state };
    tmpState.loggedInUser = user
    return tmpState;
  }),
  on(actions.loadDashboardDataSuccess, (state: State, { dashboardData }) => {
    const tmpState = { ...state };
    tmpState.dashboardData = dashboardData
    return tmpState;
  }),
  on(actions.loadTaskPerprojectReportDataSuccess, (state: State, { reportData }) => {
    const tmpState = { ...state };
    tmpState.taskPerProjectReportData = reportData
    return tmpState;
  }),
  on(actions.loadProgressOnProjectReportDataSuccess, (state: State, { reportData }) => {
    const tmpState = { ...state };
    tmpState.progressOnProjectReportData = reportData
    return tmpState;
  }),
);

export function reducer(state: State | undefined, action: Action) {
  return deviceReducer(state, action)
}