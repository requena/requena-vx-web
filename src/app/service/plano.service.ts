import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  constructor(private rest: RestService) { }

  public list() {
    return this.rest.get(`plano`).then(ret => {
      return ret;
    }).catch(err => {
      console.log(err);
    });
  }

  get(id: string) {
    return this.rest.get(`plano/${id}`).then(ret => {
      return ret;
    }).catch(err => {
      console.log(err);
    });
  }
}
