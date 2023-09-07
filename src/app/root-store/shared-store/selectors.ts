import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import { Employee } from "src/app/employee/models/employee.model";


export const selectSharedState = createFeatureSelector<State>('shared');

const getLoggedInUser = (state: State): Employee | null => {
    return state.loggedInUser;
}

export const selectLoggedInUser = createSelector(selectSharedState, getLoggedInUser);

