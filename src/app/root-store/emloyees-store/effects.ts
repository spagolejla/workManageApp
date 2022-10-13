import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, concatMap, exhaustMap, map, Observable, of, switchMap } from "rxjs";
import { EmployeeService } from "src/app/employee/services/employee.service";
import { SharedService } from "src/app/shared/services/shared.service";
import { EmployeeState } from ".";
import { ActionTypes, loadDataSuccess, noAction } from "./actions";
import * as employeeActions from './actions'


@Injectable()
export class EmployeeEffects {
    constructor(
        private actions$: Actions,
        private emloyeeService: EmployeeService,
        private store$: Store<EmployeeState.State>
    ) { }

    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.LOAD_DATA_REQUEST),
            switchMap(() => this.emloyeeService.getEmployees().pipe(
                map(employees => loadDataSuccess({ employees })),
                catchError(() => of(noAction))
            ))
        )
    );

    saveEmployeesRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.SAVE_EMPLOYEE_REQUEST),
            exhaustMap(action =>
                this.emloyeeService.createEmployee(action['employee']).pipe(
                    concatMap((employee) => {
                        return [
                            employeeActions.saveEmployeeeSuccess({ employee }),
                            employeeActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(employeeActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    updateEmployeesRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.UPDATE_EMPLOYEE_REQUEST),
            exhaustMap(action =>
                this.emloyeeService.updateEmployee(action['employee']).pipe(
                    concatMap((employee) => {
                        return [
                            employeeActions.updateEmployeeeSuccess({ employee }),
                            employeeActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(employeeActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    deleteEmployeesRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ActionTypes.DELETE_EMPLOYEE_REQUEST),
            exhaustMap(action =>
                this.emloyeeService.deleteEmployee(action['employeeId']).pipe(
                    concatMap((employee) => {
                        return [
                            employeeActions.deleteEmployeeeSuccess(),
                            employeeActions.loadDataRequest(),
                        ]
                    }),
                    catchError(error =>
                        of(employeeActions.errorAction({ error }))
                    )
                )
            )
        )
    );

    // @Effect()
    // saveRequestEffect$() {
    //     return this.actions$.pipe(
    //         ofType(
    //             ActionTypes.SAVE_EMPLOYEE_REQUEST
    //         ),
    //         exhaustMap((action) =>
    //             this.emloyeeService.createEmployee({}).pipe(
    //                 map((employee) => {
    //                     return employeeActions.saveEmployeeeSuccess({ employee });
    //                 }),
    //                 catchError(error =>
    //                     of(employeeActions.errorAction({ error }))
    //                 )
    //             )
    //         )
    //     );
    // }
}