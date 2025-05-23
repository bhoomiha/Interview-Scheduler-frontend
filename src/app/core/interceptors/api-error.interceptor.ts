import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 0) {
       
        router.navigate(['/network-error']); // Redirect to a custom error page
      }
      return throwError(() => error);
    })
  );
};
