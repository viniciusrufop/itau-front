import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from "./components/auth-login/auth-login.component";
import { AutoLoginGuard } from "./auto-login.guard";

const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginComponent,
    canActivate: [ AutoLoginGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
