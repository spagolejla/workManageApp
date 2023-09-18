import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { SharedService } from "src/app/shared/services/shared.service";
import { ActionTypes, loadDashboardDataSuccess, loadTaskPerprojectReportDataSuccess, noAction } from "./actions";
import { SharedState } from ".";

@Injectable()
export class SharedEffects {
    constructor(
        private actions$: Actions,
        private sharedService: SharedService,
        private store$: Store<SharedState.State>
    ) { }


    loadDashboardData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LOAD_DASHBOARD_DATA_REQUEST),
            switchMap(() => this.sharedService.getDashboardData().pipe(
                map(dashboardData => loadDashboardDataSuccess({ dashboardData })),
                catchError(() => of(noAction))
            ))
        )
    );

    
    loadTaskPerProjectReportData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LOAD_TASK_PER_PROJECT_REPORT_DATA_REQUEST),
            switchMap(() => this.sharedService.getTasksPerProjectReportData().pipe(
                map(reportData => loadTaskPerprojectReportDataSuccess({ reportData })),
                catchError(() => of(noAction))
            ))
        )
    );


}