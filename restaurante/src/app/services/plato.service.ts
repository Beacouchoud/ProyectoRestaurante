import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPlato } from '../models/plato.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(protected http: HttpClient) { }

  createPlato(plato: IPlato): Observable<any> {
    return this.http.post(environment.URL_API + '/createPlato', plato);
  }

  listaPlatos(): Observable<Array<IPlato>> {
    return this.http.get(environment.URL_API + '/getPlatos').pipe(
      map(platos => platos as Array<IPlato>)
    );
  }

  enablePlato(habilitado: number, id: string): Observable<any> {
    return this.http.post(environment.URL_API + '/enablePlato', {habilitado, id});
  }

  updatePlato(id: string, plato: IPlato): Observable<any> {
    return this.http.post(environment.URL_API + '/updatePlato', {plato, id});
  }
}
