import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportingManagerComponent } from './reporting-manager/reporting-manager.component';
import { DashboardComponent } from './reporting-manager/dashboard/dashboard.component';
import { TeamMembersComponent } from './reporting-manager/team-members/team-members.component';
import { ReportingManagerCalendarComponent } from './reporting-manager/reporting-manager-calendar/reporting-manager-calendar.component';


const routes: Routes = [
    {
        path: '',
        component: ReportingManagerComponent, // Parent Component (Layout)
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'team-members', component: TeamMembersComponent },
          { path: 'reporting-manager-calendar', component: ReportingManagerCalendarComponent },
          { path: '', redirectTo: 'team-members', pathMatch: 'full' } // Default child route
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingManagerRoutingModule { }
