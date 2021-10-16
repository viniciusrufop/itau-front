import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PoloService } from "../../../core/services/polo.service";
import { takeUntil } from "rxjs/operators";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Subject } from "rxjs";
import { IBusiness } from "../../../core/interfaces/ibusiness";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from "../../../core/services/util.service";

@Component({
  selector: 'app-polo-view',
  templateUrl: './polo-view.component.html',
  styleUrls: ['./polo-view.component.scss']
})
export class PoloViewComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  private unsub$ = new Subject();

  form!: FormGroup;

  public polo: IBusiness = {} as IBusiness;

  constructor(
    private route: ActivatedRoute,
    private poloService: PoloService,
    private formBuilder: FormBuilder,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.createForm();

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.getPolo(id);
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      business: ['', [Validators.required]],
      valuation: ['', [Validators.required]],
      active: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
    });
  }

  getPolo(id: number): void {
    this.blockUI.start();

    this.poloService.getById(id).pipe(takeUntil(this.unsub$)).subscribe(res => {
      this.polo = res;
      this.form.patchValue({
        id: res.id,
        name: res.name,
        business: res.business,
        valuation: res.valuation.toString().replace('.', ','),
        active: res.active,
        cep: res.cep,
        cnpj: res.cnpj,
      });
    }).add(() => this.blockUI.stop());
  }

  getErrorMessage(field: string): string | undefined {
    return this.utilService.getError(this.form, field);
  }

}
