import { createAction, props, union } from "@ngrx/store";
import { Employee } from "src/app/employee/models/employee.model";
import { DashboardData } from "src/app/shared/models/dashboard-data.model";

export enum ActionTypes {
   
    SET_LOGGED_USER = "[Shared] Set LoggedInUser",
    LOAD_DASHBOARD_DATA_REQUEST = "[Shared] Load Dashboard Data Request",
    LOAD_DASHBOARD_DATA_SUCCESS = "[Shared] Load Dashboard Data Success",
    NO_ACTION  = "[Task] No Action",
    ERROR  = "[Task] ERROR Action",
}

export const setLoggedUser = createAction(ActionTypes.SET_LOGGED_USER, props<  { user: Employee | null } >());
export const loadDashboardDataRequest = createAction(ActionTypes.LOAD_DASHBOARD_DATA_REQUEST);
export const loadDashboardDataSuccess = createAction(ActionTypes.LOAD_DASHBOARD_DATA_SUCCESS, props<  { dashboardData: DashboardData } >());

export const noAction = createAction(ActionTypes.NO_ACTION);
export const errorAction = createAction(ActionTypes.ERROR, props<  { error: any } >());

