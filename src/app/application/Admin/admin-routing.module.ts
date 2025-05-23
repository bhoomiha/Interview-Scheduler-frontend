import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdmindashboardComponent, // Parent component
   
    children: [
      {
        path: 'user-management',
        loadComponent: () =>
          import('./components/user-management/user-management.component').then(
            (m) => m.UserManagementComponent
          ),
       
      },
      {
        path: 'role-management',
        loadComponent: () =>
          import('./components/role-management/role-management.component').then(
            (m) => m.RoleManagementComponent
          ),
       
      },
      { path: '', redirectTo: 'user-management', pathMatch: 'full' }, //Default route
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
