import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  constructor(private rest: RestService) { }

  public list() {
    return this.rest.get(`tarifa`).then(ret => {
      return ret;
    }).catch(err => {
      console.log(err);
    });
  }

  get(id: number) {
    return this.rest.get(`tarifa/${id}`).then(ret => {
      return ret;
    }).catch(err => {
      console.log(err);
    });
  }
}
