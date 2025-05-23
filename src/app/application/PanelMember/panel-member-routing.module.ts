import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelMemberComponent } from './panel-member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetSlotsComponent } from './get-slots/get-slots.component';
import { PanelCalendarComponent } from './panel-member-calendar/panel-member-calendar.component';
import { PanelWindowsComponent } from './panel-windows/panel-windows.component';
import { CreateSlotFormComponent } from './slot-form/slot-form.component';

const routes: Routes = [
  {
    path: '',
    component: PanelMemberComponent,
    children: [
      { path: '', redirectTo: 'panel-member-calendar', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'get-slots', component: GetSlotsComponent },
      { path: 'panel-member-calendar', component: PanelCalendarComponent },
      { path: 'panel-member-window', component: PanelWindowsComponent },
      { path: 'slot-form', component: CreateSlotFormComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelMemberRoutingModule { }
