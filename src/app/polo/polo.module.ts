import { NgModule } from '@angular/core';

import { PoloRoutingModule } from './polo-routing.module';
import { PoloListComponent } from './components/polo-list/polo-list.component';
import { PoloViewComponent } from './components/polo-view/polo-view.component';
import { SharedModule } from "../shared/shared.module";
import { SmartComponentsModule } from "../smart-components/smart-components.module";


@NgModule({
  declarations: [
    PoloListComponent,
    PoloViewComponent
  ],
  imports: [
    SharedModule,
    PoloRoutingModule,
    SmartComponentsModule
  ]
})
export class PoloModule { }
