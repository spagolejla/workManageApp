import { Employee } from "src/app/employee/models/employee.model";

export interface State {
    loggedInUser: Employee | null;
};

export const initialState: State = {
    loggedInUser: null
};