import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import { Employee } from "src/app/employee/models/employee.model";
import { DashboardData } from "src/app/shared/models/dashboard-data.model";
import { TaskPerProjectReport } from "src/app/reports/models/tasks-per-project-report.model";
import { ProgressOnProjectReportModel } from "src/app/reports/models/progress-on-project-report.model";


export const selectSharedState = createFeatureSelector<State>('shared');

const getLoggedInUser = (state: State): Employee | null => {
    return state.loggedInUser;
}

const getDashboardData = (state: State): DashboardData | null => {
    return state.dashboardData;
}

const getTaskPerProjectReportData = (state: State): Array<TaskPerProjectReport> | [] => {
    return state.taskPerProjectReportData;
}

const getProgressOnProjectReportData = (state: State): Array<ProgressOnProjectReportModel> | [] => {
    return state.progressOnProjectReportData;
}

export const selectLoggedInUser = createSelector(selectSharedState, getLoggedInUser);
export const selectDashboardData = createSelector(selectSharedState, getDashboardData);
export const selectTaskPerProjectReportData = createSelector(selectSharedState, getTaskPerProjectReportData);
export const selectProgressOnProjectReportData = createSelector(selectSharedState, getProgressOnProjectReportData);




