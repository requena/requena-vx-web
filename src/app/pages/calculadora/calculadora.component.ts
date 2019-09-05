import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TarifaService } from '../../service/tarifa.service';
import { PlanoService } from '../../service/plano.service';
import { CalculadoraService } from '../../service/calculadora.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  constructor(private tarifaService: TarifaService, private planoService: PlanoService, private calculadoraService: CalculadoraService,
    private _decimalPipe: DecimalPipe) { }

  origemControl = new FormControl();
  destinoControl = new FormControl();
  filteredOrigem: Observable<string[]>;
  filteredDestino: Observable<string[]>;
  origemOptions: string[] = [];
  destinoOptions: string[] = [];
  origemList: Array<any> = [];
  planoList: Array<any> = [];
  model: any = {
    origemValue: '',
    destinoValue: '',
    totalMinuto: ''
  };
  semPlano: any = {
    nome: 'Sem Plano',
    valor: ''
  };

  executadaConsulta = false;
  ngOnInit() {
    this.tarifaService.list().then(result => {
      this.origemList = result['value'];
      this.origemOptions.length = 0;
      this.origemList.forEach(element => {
        this.origemOptions.push(element._id.toString());
      });
      this.filteredOrigem = this.origemControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterOrigem(value))
        );
    });
    this.planoService.list().then(result => {
      this.planoList = result['value'];
    });

  }

  private _filterOrigem(value: string): string[] {
    const filterValue = value ? value.toString() : '';
    return this.origemOptions.filter(option => option.toString().includes(filterValue));
  }
  private _filterDestino(value: string): string[] {
    const filterValue = value;
    return this.destinoOptions.filter(option => option.toString().includes(filterValue));
  }

  origemChange(newOrigem) {
    const or = this.origemList.filter(option => option._id === +newOrigem)[0];
    console.log(or);
    if (!or) {
      return;
    }
    this.destinoOptions.length = 0;
    or.destino.forEach(element => {
      this.destinoOptions.push(element.ddd.toString());
    });

    this.filteredDestino = this.origemControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterDestino(value))
      );
  }

  calcularValores() {
    this.executadaConsulta = true;
    this.planoList.forEach(plano => {
      this.calculadoraService.calcular(this.model.origemValue, this.model.destinoValue, plano._id, this.model.totalMinuto)
        .then(result => {
          plano.resultado = this._decimalPipe.transform(result['resultado'].comPlano, '1.2-2');
          this.semPlano.valor = this._decimalPipe.transform(result['resultado'].semPlano, '1.2-2');
        });
    });
  }
}
