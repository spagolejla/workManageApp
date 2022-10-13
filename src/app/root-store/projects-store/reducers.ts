import { Action, createReducer, on } from "@ngrx/store";
import { initialState, State } from "./state";
import * as actions from './actions';


const deviceReducer = createReducer (
    initialState,
    on(actions.loadDataSuccess, (state: State, { projects }) => {
      const tmpState = { ... state };
      tmpState.projects = projects
      return tmpState;
    }),
    on(actions.setSearchValue, (state: State, { searchValue }) => {
      const tmpState = { ... state };
      tmpState.searchValue = searchValue
      return tmpState;
    }),
    on(actions.setSelectedProject, (state: State, { project }) => {
      const tmpState = { ... state };
      tmpState.selectedProject = project
      return tmpState;
    }),
);

export function reducer(state: State | undefined, action: Action ) {
    return deviceReducer(state, action)
}