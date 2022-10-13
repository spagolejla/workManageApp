import { ProjectStatus } from "./project-status-model";

export class Project {
    id: string | undefined;
    name: string | undefined;
    description: string | undefined;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    budgetAmount?: number | undefined;
    hasTicketsAssigned?: boolean | undefined;
    status: ProjectStatus | undefined;
    location?: string | undefined;
}