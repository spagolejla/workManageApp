import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import { Employee } from "src/app/employee/models/employee.model";
import { DashboardData } from "src/app/shared/models/dashboard-data.model";


export const selectSharedState = createFeatureSelector<State>('shared');

const getLoggedInUser = (state: State): Employee | null => {
    return state.loggedInUser;
}

const getDashboardData = (state: State): DashboardData | null => {
    return state.dashboardData;
}

export const selectLoggedInUser = createSelector(selectSharedState, getLoggedInUser);
export const selectDashboardData = createSelector(selectSharedState, getDashboardData);


