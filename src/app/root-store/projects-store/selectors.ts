import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./state";
import * as fromRouter from '@ngrx/router-store';
import { RouterState } from "@angular/router";
import { getSelectors } from "@ngrx/router-store";
import { selectTitle, selectCurrentRoute, selectUrl, selectFragment, selectQueryParams, selectRouteParams } from "../router-selectors";

export const selectProjectState = createFeatureSelector<State>('projects');

const getSearchValue = (state: State): string => state.searchValue;
export const selectSearchValue = createSelector(selectProjectState, getSearchValue);


const getProjects = (state: State): any[] => {
    return state.projects;
}
export const selectProjects = createSelector(selectProjectState, getProjects);


export const selectFilteredProjects = createSelector(
    selectSearchValue,
    selectProjects,
    (searchValue, projects) => {
        if (searchValue != "") {
            return projects.filter(project => project.name?.toLocaleLowerCase().indexOf(searchValue?.toLocaleLowerCase()) != -1)
        }
        return projects;
    }
);

export const selectedProject = createSelector(
    selectProjects,
    selectRouteParams,
    (projects, routerParams) => {
        const id = routerParams && routerParams["id"]
        return projects && projects.find(x => x.id == id);
    }
);

export const selectedProjectFromState = createSelector(
    selectProjectState,
    (state) => {
        return state.selectedProject;
    }
);

