import { RouterModule, Routes } from "@angular/router";
import { TAAdminComponentComponent } from "./taadmin-component/taadmin-component.component";
import { InterviewListComponent } from "./interview-list/interview-list.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CalendarComponent } from "./calendar/calendar.component";

const routes: Routes = [
    {
      path: '',
      component: TAAdminComponentComponent,
      children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'interview-list', component: InterviewListComponent },
        { path: 'calendar', component: CalendarComponent },
        { path: '', redirectTo: 'interview-list', pathMatch: 'full' }
      ],
    }
    
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TAAdminRoutingModule { }
  