import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { AcoesService } from './acoes.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  public acoesInput = new FormControl();
  public acoes$ = this.acoesService.getAcoes();
  public test$ = this.acoesInput.valueChanges.pipe(tap(console.log));

  constructor(private acoesService: AcoesService) {}
}
