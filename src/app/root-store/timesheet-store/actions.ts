import { createAction, props, union } from "@ngrx/store";
import { Timesheet } from "src/app/timesheet/models/timesheet.model";

export enum ActionTypes {
    LOAD_DATA_REQUEST = "[Timesheet] Load Data Request",
    LOAD_DATA_SUCCESS = "[Timesheet] Load Data Success",
    SET_SEARCH_VALUE = "[Timesheet] Set Search Value",
    SET_SELECTED_TIMESHEET = "[Timesheet] Set Selected Timesheet",
    SAVE_TIMESHEET_REQUEST = '[Timesheet] Save Timesheet Request',
    SAVE_TIMESHEET_SUCCESS = '[Timesheet] Save Timesheet Success',
    UPDATE_TIMESHEET_REQUEST = '[Timesheet] Update Timesheet Request',
    UPDATE_TIMESHEET_SUCCESS = '[Timesheet] Update Timesheet Success',
    DELETE_TIMESHEET_REQUEST = '[Timesheet] Delete Timesheet Request',
    DELETE_TIMESHEET_SUCCESS = '[Timesheet] Delete Timesheet Success',
    LOAD_TIMESHEETS_BY_USER_REQUEST = "[Timesheet] Load Timesheets By User Request",
    LOAD_TIMESHEETS_BY_USER_SUCCESS = "[Timesheet] Load Timesheets By User Success",
    NO_ACTION  = "[Timesheet] No Action",
    ERROR  = "[Timesheet] ERROR Action",
}

export const loadDataRequest = createAction(ActionTypes.LOAD_DATA_REQUEST, props<  { date: Date | undefined | null } >());
export const loadDataSuccess = createAction(ActionTypes.LOAD_DATA_SUCCESS, props<  { timesheets: Array<Timesheet> } >());
export const setSearchValue = createAction(ActionTypes.SET_SEARCH_VALUE, props<  { searchValue: string } >());
export const setSelectedTimesheet = createAction(ActionTypes.SET_SELECTED_TIMESHEET, props<  { timesheet: any } >());
export const saveTimessetSelectedTimesheetheetRequest = createAction(ActionTypes.SAVE_TIMESHEET_REQUEST, props<  { timesheet: Timesheet } >());
export const saveTimesheetSuccess = createAction(ActionTypes.SAVE_TIMESHEET_SUCCESS, props<  { timesheet: Timesheet } >());
export const updateTimesheetRequest = createAction(ActionTypes.UPDATE_TIMESHEET_REQUEST, props<  { timesheet: Timesheet } >());
export const updateTimesheetSuccess = createAction(ActionTypes.UPDATE_TIMESHEET_SUCCESS, props<  { timesheet: Timesheet } >());
export const deleteTimesheetRequest = createAction(ActionTypes.DELETE_TIMESHEET_REQUEST, props<  { timesheetId: string } >());
export const loadTimesheetsByUserRequest = createAction(ActionTypes.LOAD_TIMESHEETS_BY_USER_REQUEST, props<  { userId: string | null } >());
export const loadTimesheetsByUserSuccess = createAction(ActionTypes.LOAD_TIMESHEETS_BY_USER_SUCCESS, props<  { timesheets: Array<Timesheet> } >());
export const deleteTimesheetSuccess = createAction(ActionTypes.DELETE_TIMESHEET_SUCCESS);
export const noAction = createAction(ActionTypes.NO_ACTION);
export const errorAction = createAction(ActionTypes.ERROR, props<  { error: any } >());


  