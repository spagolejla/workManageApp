import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import * as fromRouter from '@ngrx/router-store';
import { RouterState } from "@angular/router";
import { getSelectors } from "@ngrx/router-store";
import { selectTitle, selectCurrentRoute, selectUrl, selectFragment, selectQueryParams, selectRouteParams } from "../router-selectors";

export const selectTaskState = createFeatureSelector<State>('tasks');

const getSearchValue = (state: State): string => state.searchValue;
export const selectSearchValue = createSelector(selectTaskState, getSearchValue);


const getTasks = (state: State): any[] => {
    return state.tasks;
}
export const selectTasks = createSelector(selectTaskState, getTasks);


export const selectFilteredTasks = createSelector(
    selectSearchValue,
    selectTasks,
    (searchValue, tasks) => {
        if (searchValue != "") {
            return tasks.filter(task => task.name?.toLocaleLowerCase().indexOf(searchValue?.toLocaleLowerCase()) != -1)
        }
        return tasks;
    }
);

export const selectedTask = createSelector(
    selectTasks,
    selectRouteParams,
    (tasks, routerParams) => {
        const id = routerParams && routerParams["id"]
        return tasks && tasks.find(x => x.id == id);
    }
);

export const selectedTaskFromState = createSelector(
    selectTaskState,
    (state) => {
        return state.selectedTask;
    }
);

