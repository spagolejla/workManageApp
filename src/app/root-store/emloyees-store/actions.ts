import { createAction, props, union } from "@ngrx/store";
import { Employee } from "src/app/employee/models/employee.model";

export enum ActionTypes {
    LOAD_DATA_REQUEST = "[Employee] Load Data Request",
    LOAD_DATA_SUCCESS = "[Employee] Load Data Success",
    SET_SEARCH_VALUE = "[Employee] Set Search Value",
    SET_SELECTED_EMPLOYEE = "[Employee] Set Selected Employee",
    SAVE_EMPLOYEE_REQUEST = '[Employee] Save Employee Request',
    SAVE_EMPLOYEE_SUCCESS = '[Employee] Save Employee Success',
    UPDATE_EMPLOYEE_REQUEST = '[Employee] Update Employee Request',
    UPDATE_EMPLOYEE_SUCCESS = '[Employee] Update Employee Success',
    DELETE_EMPLOYEE_REQUEST = '[Employee] Delete Employee Request',
    DELETE_EMPLOYEE_SUCCESS = '[Employee] Delete Employee Success',
    NO_ACTION  = "[Employee] No Action",
    ERROR  = "[Employee] ERROR Action",
}

export const loadDataRequest = createAction(ActionTypes.LOAD_DATA_REQUEST);
export const loadDataSuccess = createAction(ActionTypes.LOAD_DATA_SUCCESS, props<  { employees: Array<Employee> } >());
export const setSearchValue = createAction(ActionTypes.SET_SEARCH_VALUE, props<  { searchValue: string } >());
export const setSelectedEmployee = createAction(ActionTypes.SET_SELECTED_EMPLOYEE, props<  { employee?: Employee } >());
export const saveEmployeeeRequest = createAction(ActionTypes.SAVE_EMPLOYEE_REQUEST, props<  { employee: Employee } >());
export const saveEmployeeeSuccess = createAction(ActionTypes.SAVE_EMPLOYEE_SUCCESS, props<  { employee: Employee } >());
export const updateEmployeeeRequest = createAction(ActionTypes.UPDATE_EMPLOYEE_REQUEST, props<  { employee: Employee } >());
export const updateEmployeeeSuccess = createAction(ActionTypes.UPDATE_EMPLOYEE_SUCCESS, props<  { employee: Employee } >());
export const deleteEmployeeeRequest = createAction(ActionTypes.DELETE_EMPLOYEE_REQUEST, props<  { employeeId: string } >());
export const deleteEmployeeeSuccess = createAction(ActionTypes.DELETE_EMPLOYEE_SUCCESS);
export const noAction = createAction(ActionTypes.NO_ACTION);
export const errorAction = createAction(ActionTypes.ERROR, props<  { error: any } >());


  