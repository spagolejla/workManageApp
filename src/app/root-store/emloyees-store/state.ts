import { Employee } from "src/app/employee/models/employee.model";


export interface State {
    isLoading: boolean;
    employees: Array<Employee>;
    selectedEmployee?: Employee;
    searchActive: boolean;
    searchValue: string;
};

export const initialState: State = {
    isLoading: false,
    employees: [],
    selectedEmployee: undefined,
    searchActive: false,
    searchValue: ""
};