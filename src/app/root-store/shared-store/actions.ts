import { createAction, props, union } from "@ngrx/store";
import { Employee } from "src/app/employee/models/employee.model";

export enum ActionTypes {
   
    SET_LOGGED_USER = "[Shared] Set LoggedInUser",
   
    NO_ACTION  = "[Task] No Action",
    ERROR  = "[Task] ERROR Action",
}

export const setLoggedUser = createAction(ActionTypes.SET_LOGGED_USER, props<  { user: Employee | null } >());
export const noAction = createAction(ActionTypes.NO_ACTION);
export const errorAction = createAction(ActionTypes.ERROR, props<  { error: any } >());

