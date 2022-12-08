import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AcoesService } from './acoes.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  public acoesInput = new FormControl();
  public todasAcoes$ = this.acoesService.getAcoes();
  public acoesFiltradas$ = this.acoesInput.valueChanges.pipe(
    switchMap((valorDigitado) => {
      return this.acoesService.getAcoes(valorDigitado);
    })
  );

  public acoes$ = merge(this.acoesFiltradas$, this.todasAcoes$);

  constructor(private acoesService: AcoesService) {}
}
