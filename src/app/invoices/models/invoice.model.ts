import { Item } from "src/app/shared/models/item.model";
import { Timesheet } from "src/app/timesheet/models/timesheet.model";

export class Invoice {
    id: string | undefined;
    date: Date | undefined;
    employee: Item | undefined;
    totalHours: number | undefined;
    totalCost: number | undefined;
    month: string | undefined;
    timesheets: Array<Timesheet> | undefined;
}