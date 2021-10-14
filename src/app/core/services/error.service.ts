import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastr: ToastrService
  ) { }

  unauthenticated(): void {
    // this.authService.isAuthenticated.pipe(take(1)).subscribe(value => {
    //   window.localStorage.clear();
    //   this.authService.setIsAuthenticated(false);
    //   this.dialogRef.closeAll();
    //   return this.router.navigate(['/login']);
    // });
    // if (!['', '/login'].includes(this.location.path())) {
    //   this.snackBar.open('Sessão expirada, por favor efetue o login.', 'Ok', {duration: 15000, verticalPosition: 'top'});
    // }
  }

  errorMessage(error: string) {
    return this.toastr.error(error, 'Error', { timeOut: 5000 });
  }
}
