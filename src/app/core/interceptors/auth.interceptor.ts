import { inject } from '@angular/core';  
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';  
import { Observable, catchError, switchMap, throwError } from 'rxjs';  
import { AuthService } from '../services/auth.service';  

// HTTP interceptor to handle authentication and token refresh  
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {  
  const authService = inject(AuthService);  

  // Retrieve the stored user data from local storage  
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');  
  const accessToken = user?.accessToken || null;  

  let modifiedReq = req;  

  // If an access token exists, attach it to the request headers  
  if (accessToken) {  
    modifiedReq = req.clone({  
      setHeaders: { Authorization: `Bearer ${accessToken}` }  
    });  
  }  

  return next(modifiedReq).pipe(  
    catchError((error) => {  
      // Handle unauthorized (401) responses  
      if (error.status === 401) {  

        // If there is no refresh token, log out the user  
        if (!user?.refreshToken) {  
          authService.logout();  
          return throwError(() => new Error('You need to log in again.'));  
        }  

        // Attempt to refresh the access token  
        return authService.refreshToken().pipe(  
          switchMap((newToken) => {  
            // Update the stored user data with the new tokens  
            const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');  
            updatedUser.accessToken = newToken.accessToken;  
            updatedUser.refreshToken = newToken.refreshToken;  
            sessionStorage.setItem('user', JSON.stringify(updatedUser));  

            // Retry the original request with the new access token  
            const retryReq = req.clone({  
              setHeaders: { Authorization: `Bearer ${newToken.accessToken}` }  
            });  
            return next(retryReq);  
          }),  
          catchError(() => {  
            // If the refresh token is invalid or expired, log out the user  
            authService.logout();  
            return throwError(() => new Error('Session expired. Please log in again.'));  
          })  
        );  
      }  
      return throwError(() => error);  
    })  
  );  
};  
