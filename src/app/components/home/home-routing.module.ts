import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { VisitorsComponent } from '../visitors/visitors.component';
import { EmployeeComponent } from '../employee/employee.component';
import { ManagerComponent } from '../manager/manager.component';


const routes: Routes = [
  {
    path:"", component:HomeComponent, children:
    [
      {
        path:"", redirectTo:"#", pathMatch:'full'
      },
      {
        path:"home", component:HomeComponent 
      },
      {
        path:"visitors", component:VisitorsComponent
      },
      {
        path:"manager", component:ManagerComponent
      },
      {
        path:"employee", component:EmployeeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
