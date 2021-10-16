import { NgModule } from '@angular/core';
import { CepComponent } from './components/cep/cep.component';
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    CepComponent
  ],
  exports: [
    CepComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SmartComponentsModule { }
