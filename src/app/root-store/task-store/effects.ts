import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, exhaustMap, map, Observable, of, switchMap } from "rxjs";
import { TaskService } from "src/app/task/services/task.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { ActionTypes, loadDataSuccess, noAction } from "./actions";
import * as taskActions from './actions'
import { TaskState } from ".";


@Injectable()
export class TaskEffects {
    constructor(
        private actions$: Actions,
        private taskService: TaskService,
        private store$: Store<TaskState.State>
    ) { }

    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LOAD_DATA_REQUEST),
            switchMap(() => this.taskService.getTasks().pipe(
                map(tasks => loadDataSuccess({ tasks })),
                catchError(() => of(noAction))
            ))
        )
    );

    saveTasksRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.SAVE_TASK_REQUEST),
            exhaustMap(action =>
                this.taskService.createTask(action['task']).pipe(
                    concatMap((task) => {
                        return [
                            taskActions.saveTaskSuccess({ task }),
                            taskActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(taskActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    updateTasksRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.UPDATE_TASK_REQUEST),
            exhaustMap(action =>
                this.taskService.updateTask(action['task']).pipe(
                    concatMap((task) => {
                        return [
                            taskActions.updateTaskSuccess({ task }),
                            taskActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(taskActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    deleteTasksRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.DELETE_TASK_REQUEST),
            exhaustMap(action =>
                this.taskService.deleteTask(action['taskId']).pipe(
                    concatMap((task) => {
                        return [
                            taskActions.deleteTaskSuccess(),
                            taskActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(taskActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    // @Effect()
    // saveRequestEffect$() {
    //     return this.actions$.pipe(
    //         ofType(
    //             ActionTypes.SAVE_TASK_REQUEST
    //         ),
    //         exhaustMap((action) =>
    //             this.taskService.createTask({}).pipe(
    //                 map((task) => {
    //                     return taskActions.saveTaskeSuccess({ task });
    //                 }),
    //                 catchError(error =>
    //                     of(taskActions.errorAction({ error }))
    //                 )
    //             )
    //         )
    //     );
    // }
}