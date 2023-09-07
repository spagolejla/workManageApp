import { EmployeeState } from "./emloyees-store";
import { ProjectState } from "./projects-store";
import { SharedState } from "./shared-store";
import { TaskState } from "./task-store";
import { TimesheetState } from "./timesheet-store";


export interface State {
    employees: EmployeeState.State | null;
    projects: ProjectState.State | null;
    tasks: TaskState.State | null;
    timesheets: TimesheetState.State | null;
    shared: SharedState.State | null;
}

export const inititalState: State = {
    employees: null,
    projects: null,
    tasks: null,
    timesheets: null,
    shared: null
}