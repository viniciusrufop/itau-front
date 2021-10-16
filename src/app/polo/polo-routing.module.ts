import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoloListComponent } from "./components/polo-list/polo-list.component";
import { PoloViewComponent } from "./components/polo-view/polo-view.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: 'list',
    component: PoloListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view/:id',
    component: PoloViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: PoloViewComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/polo/list', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoloRoutingModule { }
