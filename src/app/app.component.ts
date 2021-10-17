import { Component, OnInit } from '@angular/core';
import { AuthService } from "./core/services/auth.service";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-root',
  template: `
      <router-outlet>
        <ng-template #blockTemplate>
          <div class="block-ui-template text-center">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;"></div>
          </div>
        </ng-template>
      <block-ui [template]="blockTemplate"></block-ui>
    </router-outlet>
    `
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    /** Rota para testes */
    this.authService.isLoggedTest().pipe(take(1)).subscribe();

    /** Rota para autenticação em alguma API */
    // this.authService.isLogged().pipe(take(1)).subscribe();
  }
}
