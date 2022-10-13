import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskComponent } from "./components/task/task.component";

const routes: Routes = [ 
    {
      path: '',
      component: TaskComponent,
      //canActivate: [LoggedInGuard]
    },

  ];
  
  
  @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  })
  export class TaskRoutingModule { }