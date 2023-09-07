import { Employee } from "src/app/employee/models/employee.model";
import { DashboardData } from "src/app/shared/models/dashboard-data.model";

export interface State {
    loggedInUser: Employee | null;
    dashboardData: DashboardData;
};

export const initialState: State = {
    loggedInUser: null,
    dashboardData: new DashboardData()
};