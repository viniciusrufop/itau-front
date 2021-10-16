import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PoloService } from "../../../core/services/polo.service";
import { takeUntil } from "rxjs/operators";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { Subject } from "rxjs";
import { IBusiness } from "../../../core/interfaces/ibusiness";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UtilService } from "../../../core/services/util.service";
import { InfoCep } from "../../../core/interfaces/info-cep";
import { ErrorService } from "../../../core/services/error.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-polo-view',
  templateUrl: './polo-view.component.html',
  styleUrls: ['./polo-view.component.scss']
})
export class PoloViewComponent implements OnInit, OnDestroy {

  @BlockUI() blockUI!: NgBlockUI;
  private unsub$ = new Subject();

  form!: FormGroup;
  formInfoCep!: FormGroup;

  public editForm: boolean = false;
  public lang!: string;

  constructor(
    private route: ActivatedRoute,
    private poloService: PoloService,
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private errorService: ErrorService,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.lang = this.translateService.currentLang;
    this.translateService.onLangChange.pipe(takeUntil(this.unsub$)).subscribe(res => this.lang = res.lang)

    this.createForm();

    if (this.route?.snapshot?.routeConfig?.path === 'new') return;

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.getPolo(id);
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      business: ['', [Validators.required]],
      valuation: ['', [Validators.required]],
      active: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.maxLength(8)]],
      cnpj: ['', [Validators.required, Validators.maxLength(14)]],
    });

    this.formInfoCep = this.formBuilder.group({
      cep: [''],
      city: [''],
      neighborhood: [''],
      service: [''],
      state: [''],
      street: [''],
    })
  }

  getPolo(id: number): void {
    this.blockUI.start();

    this.poloService.getById(id).pipe(takeUntil(this.unsub$)).subscribe(res => {
      this.editForm = true;
      this.form.patchValue({
        id: res.id,
        name: res.name,
        business: res.business,
        valuation: res.valuation.toString().replace('.', ','),
        active: res.active,
        cep: res.cep,
        cnpj: res.cnpj,
      });
    }, error => {
      return this.router.navigate(['/polo/list']);
    }).add(() => this.blockUI.stop());
  }

  save(): any {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return this.errorService.errorMessage('Formulário inválido.');
    }

    this.blockUI.start();

    if (!this.editForm) {
      let form = this.form.value;

      this.poloService.create(form).pipe(takeUntil(this.unsub$)).subscribe(res => {
        console.log(res)
      }).add(() => this.blockUI.stop());
    } else {
      let id = this.form.get('id')?.value;
      let form = this.form.value;

      this.poloService.update(id, form).pipe(takeUntil(this.unsub$)).subscribe(res => {
        console.log(res)
      }).add(() => this.blockUI.stop());
    }
  }

  getErrorMessage(field: string): string | undefined {
    return this.utilService.getError(this.form, field);
  }

  infoCep(event: InfoCep): void {
    this.formInfoCep.patchValue(event);
  }

}
