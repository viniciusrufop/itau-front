import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from "../../../core/services/util.service";
import { takeUntil } from "rxjs/operators";
import { ErrorService } from "../../../core/services/error.service";
import { AuthService } from "../../../core/services/auth.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit, OnDestroy {

  @BlockUI() blockUI!: NgBlockUI;
  private unsub$ = new Subject();

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private errorService: ErrorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['email@teste.com', [Validators.required, Validators.email]],
      password: ['12345678', [Validators.required, Validators.minLength(6)]]
    });
  }

  getErrorMessage(field: string): string | undefined {
    return this.utilService.getError(this.form, field);
  }

  signIn(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return this.errorService.errorMessage('Formulário inválido.');
    }

    /** Rota para testes */
    this.authService.signInTest().pipe(takeUntil(this.unsub$)).subscribe(() => {
      this.router.navigate(['/']).then();
    });

    /** Rota para autenticação em alguma API */
    // this.blockUI.start();
    //
    // let form = this.form.value;
    //
    // this.authService.signIn(form).pipe(takeUntil(this.unsub$)).subscribe(res => {
    //   console.log(res)
    // }).add(() => this.blockUI.stop());
  }

}
