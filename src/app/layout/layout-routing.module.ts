import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutHomeComponent } from "./components/layout-home/layout-home.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutHomeComponent,
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    children: [
      { path: '', redirectTo: '/polo/list', pathMatch: 'full'},
      { path: 'polo', loadChildren: () => import('./../polo/polo.module').then(m => m.PoloModule), canLoad: [ AuthGuard ]},
      {path: '**', redirectTo: '/polo/list', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
