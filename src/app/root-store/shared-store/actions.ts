import { createAction, props, union } from "@ngrx/store";
import { Employee } from "src/app/employee/models/employee.model";
import { ProgressOnProjectReportModel } from "src/app/reports/models/progress-on-project-report.model";
import { TaskPerProjectReport } from "src/app/reports/models/tasks-per-project-report.model";
import { DashboardData } from "src/app/shared/models/dashboard-data.model";

export enum ActionTypes {
   
    SET_LOGGED_USER = "[Shared] Set LoggedInUser",
    LOAD_DASHBOARD_DATA_REQUEST = "[Shared] Load Dashboard Data Request",
    LOAD_DASHBOARD_DATA_SUCCESS = "[Shared] Load Dashboard Data Success",
    LOAD_TASK_PER_PROJECT_REPORT_DATA_REQUEST = "[Shared] Load Task Per Project Report Data Request",
    LOAD_TASK_PER_PROJECT_REPORT_DATA_SUCCESS = "[Shared] Load Task Per Project Report Data Success",
    LOAD_PROGRESS_ON_PROJECT_REPORT_DATA_REQUEST = "[Shared] Load Progress On Project Report Data Request",
    LOAD_PROGRESS_ON_PROJECT_REPORT_DATA_SUCCESS = "[Shared] Load Progress On Project Report Data Success",
    NO_ACTION  = "[Task] No Action",
    ERROR  = "[Task] ERROR Action",
}

export const setLoggedUser = createAction(ActionTypes.SET_LOGGED_USER, props<  { user: Employee | null } >());
export const loadDashboardDataRequest = createAction(ActionTypes.LOAD_DASHBOARD_DATA_REQUEST);
export const loadDashboardDataSuccess = createAction(ActionTypes.LOAD_DASHBOARD_DATA_SUCCESS, props<  { dashboardData: DashboardData } >());
export const loadTaskPerprojectReportDataRequest = createAction(ActionTypes.LOAD_TASK_PER_PROJECT_REPORT_DATA_REQUEST);
export const loadTaskPerprojectReportDataSuccess = createAction(ActionTypes.LOAD_TASK_PER_PROJECT_REPORT_DATA_SUCCESS, props<  { reportData: Array<TaskPerProjectReport> } >());
export const loadProgressOnProjectReportDataRequest = createAction(ActionTypes.LOAD_PROGRESS_ON_PROJECT_REPORT_DATA_REQUEST);
export const loadProgressOnProjectReportDataSuccess = createAction(ActionTypes.LOAD_PROGRESS_ON_PROJECT_REPORT_DATA_SUCCESS, props<  { reportData: Array<ProgressOnProjectReportModel> } >());

export const noAction = createAction(ActionTypes.NO_ACTION);
export const errorAction = createAction(ActionTypes.ERROR, props<  { error: any } >());

