import { TimesheetStatus } from "./timesheet-status.model";
import { Item } from "src/app/shared/models/item.model";

export class TimesheetAction {
    id: string | undefined;
    status: TimesheetStatus | undefined;
    comment: string | undefined | null;
    user: Item | undefined;
    date: Date | undefined;
}