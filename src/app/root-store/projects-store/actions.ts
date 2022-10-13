import { createAction, props, union } from "@ngrx/store";
import { Project } from "src/app/project/models/project.model";

export enum ActionTypes {
    LOAD_DATA_REQUEST = "[Project] Load Data Request",
    LOAD_DATA_SUCCESS = "[Project] Load Data Success",
    SET_SEARCH_VALUE = "[Project] Set Search Value",
    SET_SELECTED_PROJECT = "[Project] Set Selected Project",
    SAVE_PROJECT_REQUEST = '[Project] Save Project Request',
    SAVE_PROJECT_SUCCESS = '[Project] Save Project Success',
    UPDATE_PROJECT_REQUEST = '[Project] Update Project Request',
    UPDATE_PROJECT_SUCCESS = '[Project] Update Project Success',
    DELETE_PROJECT_REQUEST = '[Project] Delete Project Request',
    DELETE_PROJECT_SUCCESS = '[Project] Delete Project Success',
    NO_ACTION  = "[Project] No Action",
    ERROR  = "[Project] ERROR Action",
}

export const loadDataRequest = createAction(ActionTypes.LOAD_DATA_REQUEST);
export const loadDataSuccess = createAction(ActionTypes.LOAD_DATA_SUCCESS, props<  { projects: Array<Project> } >());
export const setSearchValue = createAction(ActionTypes.SET_SEARCH_VALUE, props<  { searchValue: string } >());
export const setSelectedProject = createAction(ActionTypes.SET_SELECTED_PROJECT, props<  { project: any } >());
export const saveProjecteRequest = createAction(ActionTypes.SAVE_PROJECT_REQUEST, props<  { project: Project } >());
export const saveProjecteSuccess = createAction(ActionTypes.SAVE_PROJECT_SUCCESS, props<  { project: Project } >());
export const updateProjecteRequest = createAction(ActionTypes.UPDATE_PROJECT_REQUEST, props<  { project: Project } >());
export const updateProjecteSuccess = createAction(ActionTypes.UPDATE_PROJECT_SUCCESS, props<  { project: Project } >());
export const deleteProjecteRequest = createAction(ActionTypes.DELETE_PROJECT_REQUEST, props<  { projectId: string } >());
export const deleteProjecteSuccess = createAction(ActionTypes.DELETE_PROJECT_SUCCESS);
export const noAction = createAction(ActionTypes.NO_ACTION);
export const errorAction = createAction(ActionTypes.ERROR, props<  { error: any } >());


  