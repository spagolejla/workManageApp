import { Project } from "src/app/project/models/project.model";



export interface State {
    isLoading: boolean;
    projects: Array<Project>;
    selectedProject?: Project;
    searchActive: boolean;
    searchValue: string;
};

export const initialState: State = {
    isLoading: false,
    projects: [],
    selectedProject: undefined,
    searchActive: false,
    searchValue: ""
};