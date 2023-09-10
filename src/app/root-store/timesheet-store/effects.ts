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
            switchMap(action => this.timesheetService.getTimesheets(action['date']).pipe(
                map(timesheets => loadDataSuccess({ timesheets })),
                catchError(() => of(noAction))
            ))
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
                            timesheetActions.loadDataRequest({date: new Date()}),
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
                            timesheetActions.loadDataRequest({date: new Date()}),
                        ]
                    }),
                    catchError(error =>
                        of(timesheetActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    loadEmployeeTimesheets$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ActionTypes.LOAD_TIMESHEETS_BY_USER_REQUEST),
        switchMap(action => this.timesheetService.getTimesheetsByUser(action['userId']).pipe(
            map(timesheets => timesheetActions.loadTimesheetsByUserSuccess({ timesheets })),
            catchError(() => of(noAction))
        ))
    )
);


}