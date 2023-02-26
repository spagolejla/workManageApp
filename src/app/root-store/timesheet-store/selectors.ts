import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import * as fromRouter from '@ngrx/router-store';
import { RouterState } from "@angular/router";
import { getSelectors } from "@ngrx/router-store";
import { selectTitle, selectCurrentRoute, selectUrl, selectFragment, selectQueryParams, selectRouteParams } from "../router-selectors";

export const selectTimesheetState = createFeatureSelector<State>('timesheets');

const getSearchValue = (state: State): string => state.searchValue;
export const selectSearchValue = createSelector(selectTimesheetState, getSearchValue);


const getTimesheets = (state: State): any[] => {
    return state.timesheets;
}
export const selectTimesheets = createSelector(selectTimesheetState, getTimesheets);


export const selectFilteredTimesheets = createSelector(
    selectSearchValue,
    selectTimesheets,
    (searchValue, timesheets) => {
        if (searchValue != "") {
            return timesheets.filter(timesheet => timesheet.user.name?.toLocaleLowerCase().indexOf(searchValue?.toLocaleLowerCase()) != -1)
        }
        return timesheets;
    }
);

export const selectedTimesheet = createSelector(
    selectTimesheets,
    selectRouteParams,
    (timesheets, routerParams) => {
        const id = routerParams && routerParams["id"]
        return timesheets && timesheets.find(x => x.id == id);
    }
);

export const selectedTimesheetFromState = createSelector(
    selectTimesheetState,
    (state) => {
        return state.selectedTimesheet;
    }
);

