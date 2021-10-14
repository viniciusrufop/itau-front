import { Component, OnInit } from '@angular/core';
import { AuthService } from "./core/services/auth.service";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-root',
  template: `
      <router-outlet>
        <ng-template #blockTemplate>
          <div class="block-ui-template">
            Carregando...
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
    // this.authService.isLogged().pipe(take(1)).subscribe();
    this.authService.isLoggedTeste().pipe(take(1)).subscribe();
  }
}
