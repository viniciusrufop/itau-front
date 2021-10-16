import { Injectable } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getError(form: FormGroup, field: string): string | undefined {
    if (!form.get(field)?.invalid || !form.get(field)?.touched) { return; }

    return form.get(field)?.hasError('required') ? 'Campo obrigatório' :
      form.get(field)?.hasError('minlength') ? `Entre com no minimo ${form.get(field)?.errors?.minlength?.requiredLength} caracteres` :
        form.get(field)?.hasError('email') ? 'Email inválido' :
          '';
  }

}

