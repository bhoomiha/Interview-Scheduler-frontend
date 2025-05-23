import { RouterModule, Routes } from "@angular/router";
import { SlotListComponent } from "./slot-list/slot-list.component";
import { TADashboardComponent } from "./tadashboard/tadashboard.component";
import { TARecruiterComponent } from "./tarecruiter/tarecruiter.component";
import { NgModule } from "@angular/core";
import { ScheduleCalendarComponent } from "./schedule-calendar/schedule-calendar.component";
import { ScheduledInterviewsComponent } from "./scheduled-interviews/scheduled-interviews.component";

const routes: Routes = [
    {
      path: '',
      component: TARecruiterComponent,
      children: [
        { path: 'tadashboard', component: TADashboardComponent },
        { path: 'slot-list', component: SlotListComponent },
        { path: 'schedule-calendar', component: ScheduleCalendarComponent },
        {path: 'scheduled-interviews', component:ScheduledInterviewsComponent},
        { path: '', redirectTo: 'slot-list', pathMatch: 'full' }
      ],
    }
    
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TARecruiterRoutingModule { }
  