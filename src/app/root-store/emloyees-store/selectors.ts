import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import * as fromRouter from '@ngrx/router-store';
import { RouterState } from "@angular/router";
import { getSelectors } from "@ngrx/router-store";
import { selectTitle, selectCurrentRoute, selectUrl, selectFragment, selectQueryParams, selectRouteParams } from "../router-selectors";
import { Item } from "src/app/shared/models/item.model";

export const selectEmployeeState = createFeatureSelector<State>('employees');

const getSearchValue = (state: State): string => state.searchValue;
export const selectSearchValue = createSelector(selectEmployeeState, getSearchValue);


const getEmployees = (state: State): any[] => {
    return state.employees;
}
export const selectEmployees = createSelector(selectEmployeeState, getEmployees);


export const selectFilteredEmployees = createSelector(
    selectSearchValue,
    selectEmployees,
    (searchValue, employees) => {
        if (searchValue != "") {
            return employees.filter(empl => 
                (empl.firstName?.toLocaleLowerCase().indexOf(searchValue?.toLocaleLowerCase()) != -1) ||
                (empl.lastName?.toLocaleLowerCase().indexOf(searchValue?.toLocaleLowerCase()) != -1))
        }
        return employees;
    }
);

export const selectEmployeesForSelectInput = createSelector(
    selectEmployees,
    (employees) => {
        return employees.map(employee => ({id: employee.id, name: employee.firstName + ' ' + employee.lastName }) as Item);
    }
);

export const selectedEmployee = createSelector(
    selectEmployees,
    selectRouteParams,
    (employees, routerParams) => {
        const id = routerParams && routerParams["id"]
        return employees && employees.find(x => x.id == id);
    }
);

export const selectedEmployeeFromState = createSelector(
    selectEmployeeState,
    (state) => {
        return state.selectedEmployee;
    }
);

export const selecteActiveVsNeactiveEmployeesReportData = createSelector(
    selectEmployees,
    (employees) => {
        let numberOfActiveEmployees = employees.filter(emp => emp.active == true).length;
        let numberOfInActiveEmployees = employees.filter(emp => emp.active != true).length;

        return [numberOfActiveEmployees, numberOfInActiveEmployees];
    }
);

