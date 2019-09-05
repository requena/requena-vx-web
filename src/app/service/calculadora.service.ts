import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  constructor(private rest: RestService) { }

  calcular(origem, destino, idPlano, totalMinuto) {
    const pesquisa = {
      origem: origem,
      destino: destino,
      idPlano: idPlano,
      totalMinuto: totalMinuto
    };
    return this.rest.post(`calculadora`, pesquisa).then(ret => {
      return ret;
    }).catch(err => {
      console.log(err);
    });
  }

}
