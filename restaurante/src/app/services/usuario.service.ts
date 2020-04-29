import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(protected http: HttpClient) {
  }

  getUsuario(id: number): IUsuario {
    return null;
  }

  createUsuario(usuario: IUsuario): Observable<any> {
    return this.http.post(environment.URL_API + '/register', usuario);
  }

  updateUsuario(id: string, value: any) {

  }

  login(user: any): Observable<any> {
    return this.http.post<any>(environment.URL_API + '/login', user);
  }
}
