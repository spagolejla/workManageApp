import { Employee } from "src/app/employee/models/employee.model";
import { TaskPerProjectReport } from "src/app/reports/models/tasks-per-project-report.model";
import { DashboardData } from "src/app/shared/models/dashboard-data.model";

export interface State {
    loggedInUser: Employee | null;
    dashboardData: DashboardData;
    taskPerProjectReportData: Array<TaskPerProjectReport>
};

export const initialState: State = {
    loggedInUser: null,
    dashboardData: new DashboardData(),
    taskPerProjectReportData: []
};