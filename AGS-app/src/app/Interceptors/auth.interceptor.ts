import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  const token = isPlatformBrowser(platformId) ? localStorage.getItem('token') : null;

  let request = req;

  if (token) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      
      if (error.status === 401) {            
        if (isPlatformBrowser(platformId)) {
          localStorage.clear();
          router.navigate(['AGS/inicio']);
        }
      }
      
      return throwError(() => error);
    })
  );
};