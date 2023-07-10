import { Item } from "src/app/shared/models/item.model";
import { Priority } from "./task-priority.enum";
import { TaskStatus } from "./task-status.model";

export class Task {
    id: string | undefined;
    taskNo: number | undefined;
    title: string | undefined;
    description: string | undefined;
    createdDate?: Date | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    assigner?: Item | undefined;
    project: Item | undefined;
    status: TaskStatus | undefined;
    priority: Priority | undefined;
}