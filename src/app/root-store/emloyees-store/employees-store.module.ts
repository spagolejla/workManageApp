import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { EmployeeEffects } from "./effects";
import { reducer } from "./reducers";


@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      StoreModule.forFeature('employees' , reducer),
      EffectsModule.forFeature([EmployeeEffects])
    ]
  })
  export class EmployeesStoreModule { }