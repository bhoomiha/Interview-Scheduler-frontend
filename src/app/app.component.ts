import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './application/Header/header/header.component';

import { LoaderComponent } from "./application/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, HeaderComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Interview-Scheduler';
}
