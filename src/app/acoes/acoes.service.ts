import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelos/acoes';

@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private Http: HttpClient) {}

  public getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;

    return this.Http.get<AcoesAPI>(`${environment.api}/acoes`, { params }).pipe(
      pluck('payload'),
      map((acoes) => {
        return acoes.sort((acaoA, acaoB) =>
          this.ordenarPorCodigo(acaoA, acaoB)
        );
      })
    );
  }

  private ordenarPorCodigo(acaoA: Acao, acaoB: Acao) {
    if (acaoA.codigo > acaoB.codigo) {
      return 1;
    }
    if (acaoA.codigo < acaoB.codigo) {
      return -1;
    }
    return 0;
  }
}
