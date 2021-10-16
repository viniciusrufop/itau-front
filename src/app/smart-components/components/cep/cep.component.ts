import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as cep from 'cep-promise';
import { ErrorService } from "../../../core/services/error.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss']
})
export class CepComponent implements OnInit, OnChanges {

  @BlockUI() blockUI!: NgBlockUI;
  @Input() cepNumber!: string;
  @Output() infoCep: EventEmitter<any> = new EventEmitter();

  constructor(
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {}

  ngOnChanges(changes:SimpleChanges): void {
    if (changes.cepNumber.currentValue) {
      this.getCep(changes.cepNumber.currentValue)
    }
  }

  getCep(cepNumber: string): void {
    this.blockUI.start();

    // @ts-ignore
    cep(cepNumber).then((res: InfoCep) => {
      this.infoCep.emit(res);
      this.blockUI.stop();
    }).catch((error: any) => {
      let concatError = error.errors.map((obj: any) => obj.message);
      this.errorService.errorMessage(concatError.join(' - '))
      this.blockUI.stop();
    });
  }

  handleCep(event: any): void {
    if (event.target.value.length === 9) {
      this.getCep(event.target.value);
    }
  }

}
