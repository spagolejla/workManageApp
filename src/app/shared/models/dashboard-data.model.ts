export class DashboardData {
    numberOfTasks: number | undefined;
    numberOfActiveTasks : number | undefined;
    numberOfProjects: number | undefined;
    numberOfOpenProjects: number | undefined;
    numberOfEmployees: number | undefined;
    numberOfActiveEmployees: number | undefined;

    constructor() {
        this.numberOfTasks = 0;
        this.numberOfActiveTasks = 0;
        this.numberOfProjects = 0;
        this.numberOfOpenProjects = 0;
        this.numberOfEmployees = 0;
        this.numberOfActiveEmployees = 0;
    }
}