import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';
import { StorageKeys } from "../interfaces/storage-keys";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private errorService: ErrorService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string | null = window.localStorage.getItem(StorageKeys.AUTH_TOKEN);

    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': token,
        }
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) { this.errorService.unauthenticated(); }
        if(![200, 401].includes(error.status)) { this.errorService.errorMessage(error.error); }
        return throwError(error);
      }));

  }
}
