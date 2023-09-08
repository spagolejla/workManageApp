import { Timesheet } from "src/app/timesheet/models/timesheet.model";


export interface State {
    isLoading: boolean;
    timesheets: Array<Timesheet>;
    selectedTimesheet?: Timesheet;
    searchActive: boolean;
    searchValue: string;
    employeeTimesheets: Array<Timesheet>;
};

export const initialState: State = {
    isLoading: false,
    timesheets: [],
    selectedTimesheet: undefined,
    searchActive: false,
    searchValue: "",
    employeeTimesheets: []
};