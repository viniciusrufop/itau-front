import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth.service";
import { take } from "rxjs/operators";
import { User } from "../interfaces/user";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  unauthenticated(): void {
    this.authService.isAuthenticated.pipe(take(1)).subscribe(value => {
      window.localStorage.clear();
      this.authService.setAuthState({} as User, false);
      return this.router.navigate(['/login']);
    });
    if (!['', '/login'].includes(this.location.path())) {
      this.snackBar.open('Sessão expirada, por favor efetue o login.', 'Ok', {duration: 5000, verticalPosition: 'top'});
    }
  }

  errorMessage(error: string) {
    return this.toastr.error(error, 'Error', { timeOut: 5000 });
  }
}
