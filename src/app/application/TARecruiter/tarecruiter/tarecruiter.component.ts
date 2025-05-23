import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TADashboardComponent } from "../tadashboard/tadashboard.component";

@Component({
  selector: 'app-tarecruiter',
  imports: [ RouterModule, TADashboardComponent],
  templateUrl: './tarecruiter.component.html',
  styleUrl: './tarecruiter.component.scss'
})
export class TARecruiterComponent {}
