import { NgModule } from '@angular/core';

import { PoloRoutingModule } from './polo-routing.module';
import { PoloListComponent } from './components/polo-list/polo-list.component';
import { PoloViewComponent } from './components/polo-view/polo-view.component';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    PoloListComponent,
    PoloViewComponent
  ],
  imports: [
    SharedModule,
    PoloRoutingModule
  ]
})
export class PoloModule { }
