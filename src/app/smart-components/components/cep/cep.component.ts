import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as cep from 'cep-promise';
import { ErrorService } from "../../../core/services/error.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { FormGroup } from "@angular/forms";
import { UtilService } from "../../../core/services/util.service";

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss']
})
export class CepComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  @Input() form!: FormGroup;
  @Output() infoCep: EventEmitter<any> = new EventEmitter();

  constructor(
    private errorService: ErrorService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.form.get('cep')?.valueChanges.subscribe(res => {
      if (res.length === 8) {
        this.getCep(res);
      }
    })
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

  getErrorMessage(field: string): string | undefined {
    return this.utilService.getError(this.form, field);
  }

}
