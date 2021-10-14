import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IBusiness } from "../interfaces/ibusiness";

@Injectable({
  providedIn: 'root'
})
export class PoloService {

  constructor(
    public http: HttpClient
  ) { }

  getAll(): Observable<Array<IBusiness>> {
    return this.http.get<Array<IBusiness>>(`${environment.urlApi}/api/v1/itau_teste`);
  }

  getById(id: number): Observable<IBusiness> {
    return this.http.get<IBusiness>(`${environment.urlApi}/api/v1/itau_teste/${id}`);
  }

}
