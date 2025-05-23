import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './panel-coordinator/dashboard/dashboard.component';
import { PanelCoordinatorComponent } from './panel-coordinator/panel-coordinator.component';
import { AllPanelMembersComponent } from './panel-coordinator/all-panelmembers/all-panelmembers.component';
import { PanelCalendarComponent } from './panel-coordinator/panel-calendar/panel-calendar.component';
import { MapPanelMemberComponent } from './panel-coordinator/map-panel-member/map-panel-member.component';
import { MappedPanelMembersComponent } from './panel-coordinator/mapped-panel-members/mapped-panel-members.component';
import { AllocatePanelWindowComponent } from './panel-coordinator/allocate-panel-window/allocate-panel-window.component';
import { PanelWindowsComponent } from './panel-coordinator/panel-windows/panel-windows.component';

const routes: Routes = [
    {
        path: '',
        component: PanelCoordinatorComponent, // Parent Component (Layout)
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'all-panelMembers', component: AllPanelMembersComponent },
          { path: 'map-panel-member', component: MapPanelMemberComponent },
          { path: 'mapped-panel-member', component: MappedPanelMembersComponent },
          { path: 'allocate-panel-window', component: AllocatePanelWindowComponent },
          { path: 'panel-windows', component: PanelWindowsComponent },
          { path: 'panel-calendar', component: PanelCalendarComponent },
          { path: '', redirectTo: 'all-panelMembers', pathMatch: 'full' } // Default child route
        ]
      } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelCoordinatorRoutingModule { }
