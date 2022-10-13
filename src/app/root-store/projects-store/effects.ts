import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, exhaustMap, map, Observable, of, switchMap } from "rxjs";
import { ProjectService } from "src/app/project/services/project.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { ActionTypes, loadDataSuccess, noAction } from "./actions";
import * as projectActions from './actions'
import { ProjectState } from ".";


@Injectable()
export class ProjectEffects {
    constructor(
        private actions$: Actions,
        private emloyeeService: ProjectService,
        private store$: Store<ProjectState.State>
    ) { }

    loadProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LOAD_DATA_REQUEST),
            switchMap(() => this.emloyeeService.getProjects().pipe(
                map(projects => loadDataSuccess({ projects })),
                catchError(() => of(noAction))
            ))
        )
    );

    saveProjectsRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.SAVE_PROJECT_REQUEST),
            exhaustMap(action =>
                this.emloyeeService.createProject(action['project']).pipe(
                    concatMap((project) => {
                        return [
                            projectActions.saveProjecteSuccess({ project }),
                            projectActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(projectActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    updateProjectsRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.UPDATE_PROJECT_REQUEST),
            exhaustMap(action =>
                this.emloyeeService.updateProject(action['project']).pipe(
                    concatMap((project) => {
                        return [
                            projectActions.updateProjecteSuccess({ project }),
                            projectActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(projectActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    deleteProjectsRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.DELETE_PROJECT_REQUEST),
            exhaustMap(action =>
                this.emloyeeService.deleteProject(action['projectId']).pipe(
                    concatMap((project) => {
                        return [
                            projectActions.deleteProjecteSuccess(),
                            projectActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(projectActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    // @Effect()
    // saveRequestEffect$() {
    //     return this.actions$.pipe(
    //         ofType(
    //             ActionTypes.SAVE_PROJECT_REQUEST
    //         ),
    //         exhaustMap((action) =>
    //             this.emloyeeService.createProject({}).pipe(
    //                 map((project) => {
    //                     return projectActions.saveProjecteSuccess({ project });
    //                 }),
    //                 catchError(error =>
    //                     of(projectActions.errorAction({ error }))
    //                 )
    //             )
    //         )
    //     );
    // }
}