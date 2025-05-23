import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  ...appConfig,  // Spread the existing appConfig
  providers: [
    ...(appConfig.providers || []), // Ensure existing providers are included
    provideAnimations(),  // Required for Toastr
    provideToastr({
      timeOut: 3000,  // Auto close after 3 seconds
      positionClass: 'toast-top-right', // Right side notification
      preventDuplicates: true,
    }),
  ],
}).catch((err) => console.error(err));
