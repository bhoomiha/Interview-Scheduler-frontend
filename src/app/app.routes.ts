import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';

import { AuthGuard } from './core/Guard/auth.guard';
import { UnauthorizeComponent } from './application/Unauthorize/unauthorize/unauthorize.component';
import { VerifyOtpComponent } from './Login/verifyOtp/verify-otp/verify-otp.component';

import { ChangePasswordComponent } from './Login/changepassword/changepassword.component';

import { LoginGuard } from './core/Guard/login.guard';
import { NetworkerrorComponent } from './application/networkerror/networkerror.component';


export const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent ,canActivate:[LoginGuard]},
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'network-error', component: NetworkerrorComponent },

  {path:'changepassword', component:ChangePasswordComponent },
  {
    path: 'admindashboard',
    loadChildren: () =>
      import('./application/Admin/admin-routing.module').then(m => m.AdminRoutingModule),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] },
  },

  {
    path: 'panel-coordinator',
    loadChildren: () => import('./application/Panel-Coordinator/panel-coordinator-routing.module')
      .then(m => m.PanelCoordinatorRoutingModule),
      canActivate: [AuthGuard],
      data: { roles: ['PanelCoordinator'] },
  },

  {
    path: 'panel-member',
    loadChildren: () => import('./application/PanelMember/panel-member-routing.module')
                          .then(m => m.PanelMemberRoutingModule),
                          canActivate: [AuthGuard],
                          data: { roles: ['PanelMember'] },
  },

  {
    path: 'tadmin',
    loadChildren: () => import('./application/TAAdmin/taadmin-routing.module')
                          .then(m => m.TAAdminRoutingModule),
                          canActivate: [AuthGuard],
                          data: { roles: ['TAAdmin'] },
  },
  {
    path: 'ta-recruiter',
    loadChildren: () => import('./application/TARecruiter/tarecruiter-routing.module')
                          .then(m => m.TARecruiterRoutingModule),
                          canActivate: [AuthGuard],
                          data: { roles: ['TARecruiter'] },
  },

  {
    path: 'reporting-manager',
    loadChildren: () => import('./application/ReportingManager/reporting-manager-routing.module')
                          .then(m => m.ReportingManagerRoutingModule),
                          canActivate: [AuthGuard],
                          data: { roles: ['ReportingManager'] },
  },

  {
    path: 'candidate',
    loadChildren: () => import('./application/Candidate/candidate-routing.module')
                          .then(m => m.CandidateRoutingModule),
                          canActivate: [AuthGuard],
                          data: { roles: ['Candidate'] },
  },

  { path: 'unauthorized', component: UnauthorizeComponent },
  { path: '**', redirectTo: 'login' } 
];
