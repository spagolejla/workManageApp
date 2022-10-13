import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, exhaustMap, map, Observable, of, switchMap } from "rxjs";
import { TimesheetService } from "src/app/timesheet/services/timesheet.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { ActionTypes, loadDataSuccess, noAction } from "./actions";
import * as timesheetActions from './actions'
import { TimesheetState } from ".";


@Injectable()
export class TimesheetEffects {
    constructor(
        private actions$: Actions,
        private timesheetService: TimesheetService,
        private store$: Store<TimesheetState.State>
    ) { }

    loadTimesheets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LOAD_DATA_REQUEST),
            switchMap(() => this.timesheetService.getTimesheets().pipe(
                map(timesheets => loadDataSuccess({ timesheets })),
                catchError(() => of(noAction))
            ))
        )
    );

    saveTimesheetsRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.SAVE_TIMESHEET_REQUEST),
            exhaustMap(action =>
                this.timesheetService.createTimesheet(action['timesheet']).pipe(
                    concatMap((timesheet) => {
                        return [
                            timesheetActions.saveTimesheetSuccess({ timesheet }),
                            timesheetActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(timesheetActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    updateTimesheetsRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.UPDATE_TIMESHEET_REQUEST),
            exhaustMap(action =>
                this.timesheetService.updateTimesheet(action['timesheet']).pipe(
                    concatMap((timesheet) => {
                        return [
                            timesheetActions.updateTimesheetSuccess({ timesheet }),
                            timesheetActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(timesheetActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    deleteTimesheetsRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.DELETE_TIMESHEET_REQUEST),
            exhaustMap(action =>
                this.timesheetService.deleteTimesheet(action['timesheetId']).pipe(
                    concatMap((timesheet) => {
                        return [
                            timesheetActions.deleteTimesheetSuccess(),
                            timesheetActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(timesheetActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    // @Effect()
    // saveRequestEffect$() {
    //     return this.actions$.pipe(
    //         ofType(
    //             ActionTypes.SAVE_TIMESHEET_REQUEST
    //         ),
    //         exhaustMap((action) =>
    //             this.timesheetService.createTimesheet({}).pipe(
    //                 map((timesheet) => {
    //                     return timesheetActions.saveTimesheeteSuccess({ timesheet });
    //                 }),
    //                 catchError(error =>
    //                     of(timesheetActions.errorAction({ error }))
    //                 )
    //             )
    //         )
    //     );
    // }
}