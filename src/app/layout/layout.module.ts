import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutHomeComponent } from './components/layout-home/layout-home.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    LayoutHomeComponent
  ],
  imports: [
    SharedModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
