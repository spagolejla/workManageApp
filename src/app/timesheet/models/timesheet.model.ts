import { Item } from "src/app/shared/models/item.model";
import { TimesheetAction } from "./timesheet-action.model";
import { TimesheetStatus } from "./timesheet-status.model";
import { WorkPeriod } from "./work-period.model";

export class Timesheet {
    id: string | undefined;
    date: Date | undefined;
    user: Item | undefined;
    status: TimesheetStatus | undefined;
    totalHours: number | undefined;
    workPeriods: Array<WorkPeriod> | undefined;
    actions: Array<TimesheetAction> | undefined;
}