import { Action, createReducer, on } from "@ngrx/store";
import { initialState, State } from "./state";
import * as actions from './actions';


const deviceReducer = createReducer (
    initialState,
    on(actions.loadDataSuccess, (state: State, { tasks }) => {
      const tmpState = { ... state };
      tmpState.tasks = tasks
      return tmpState;
    }),
    on(actions.setSearchValue, (state: State, { searchValue }) => {
      const tmpState = { ... state };
      tmpState.searchValue = searchValue
      return tmpState;
    }),
    on(actions.setSelectedTask, (state: State, { task }) => {
      const tmpState = { ... state };
      tmpState.selectedTask = task
      return tmpState;
    }),
);

export function reducer(state: State | undefined, action: Action ) {
    return deviceReducer(state, action)
}