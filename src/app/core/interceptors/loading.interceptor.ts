import { HttpInterceptorFn } from '@angular/common/http'; 
import { inject } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
 
  loadingService.show();

  return next(req).pipe(
    delay(2000), //  Add a 2-second delay to simulate a longer request
    finalize(() => loadingService.hide())
  
  );
};
