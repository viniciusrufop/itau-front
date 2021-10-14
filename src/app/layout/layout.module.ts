import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutHomeComponent } from './components/layout-home/layout-home.component';
import { SharedModule } from "../shared/shared.module";
import { LayoutHeaderComponent } from './components/layout-header/layout-header.component';


@NgModule({
  declarations: [
    LayoutHomeComponent,
    LayoutHeaderComponent
  ],
  imports: [
    SharedModule,
    LayoutRoutingModule
  ]
})
export class LayoutModule { }
