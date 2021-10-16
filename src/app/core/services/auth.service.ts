import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user";
import { StorageKeys } from "../interfaces/storage-keys";
import { Observable, ReplaySubject, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = new ReplaySubject<boolean>(1);
  private _userData = new ReplaySubject<User>(1);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  get userData(): Observable<User> {
    return this._userData.asObservable();
  }

  signIn(form: {userName: string, password: string}): Observable<User> {
    return this.http.post<User>(`${environment.urlApi}/auth/login`, form).pipe(
      tap(res => {
        this.setAuthState(res, true);
      }),
      catchError(error => {
        this.setAuthState({} as User, false);
        return throwError(error);
      })
    );
  }

  signOut(): Observable<any> {
    return this.http.get(`${environment.urlApi}/auth/logout`).pipe(
      tap(() => {
        window.localStorage.clear();
        this.setAuthState({} as User, false);
        return this.router.navigate(['/login']);
      }),
      catchError(error => {
        window.localStorage.clear();
        this.setAuthState({} as User, false);
        return this.router.navigate(['/login']);
      })
    );
  }

  isLoggedTeste(): Observable<User> {
    const user: User = {
      theme: 'light-theme',
      language: 'pt',
      sessionKey: 'sessionKey-teste',
      fullName: 'John Doe',
      profile: 'Diretor Itaú BBA'
    };

    this.setAuthState(user, true);

    return this._userData.asObservable();
  }

  isLogged(): Observable<User> {
    return this.http.get<User>(`${environment.urlApi}/auth/logged`).pipe(
      tap(res => {
        this.setAuthState(res, true);
      }),
      catchError(error => {
        this.setAuthState({} as User, false);
        return throwError(error);
      })
    );
  }

  public setAuthState(userData: User, authenticated: boolean): void {
    window.localStorage.setItem(StorageKeys.AUTH_TOKEN, userData.sessionKey);
    window.localStorage.setItem(StorageKeys.LANGUAGE, userData.language);
    window.localStorage.setItem(StorageKeys.THEME, userData.theme);
    this._userData.next(userData);
    this._isAuthenticated.next(authenticated);
  }
}
