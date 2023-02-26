import { Task } from '../../task/models/task.model';

export class WorkPeriod {
    id: string | undefined;
    start: Date | undefined;
    end: Date |  undefined;
    totalHours!: number;
    task: Task | undefined;
}