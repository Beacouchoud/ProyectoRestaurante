import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUsuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { EUsuNivel } from '../models/usuario-nivel.enum';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private loggedUser: IUsuario;

  constructor(protected http: HttpClient) {
    this.getActiveUser().subscribe((loggedUser: IUsuario) => this.loggedUser = loggedUser);
  }

  getLoggedUser(): IUsuario {
    return this.loggedUser;
  }

  getUserLevel(): EUsuNivel{
    return this.loggedUser ? this.loggedUser.nivel : 0 ;
  }

  createUsuario(usuario: IUsuario): Observable<any> {
    return this.http.post(environment.URL_API + '/register', usuario);
  }

  listaUsuarios(): Observable<any> {
    return this.http.get(environment.URL_API + '/usersList');
  }

  updateUsuario(id: string, usuario: IUsuario): Observable<any> {
    return this.http.post(environment.URL_API + '/updateUsuario', {id, usuario});
  }

  login(user: any): Observable<any> {
    return this.http.post(environment.URL_API + '/login', user).pipe(
      map((loggedUser: IUsuario) => {
        sessionStorage.setItem('token', loggedUser.sessionId);
        return this.loggedUser = loggedUser;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get(environment.URL_API + '/logout',{
      withCredentials: true}).pipe(map(res => {
        this.loggedUser = null;
        sessionStorage.removeItem('token');
        return res;
      }));
  }

  getActiveUser(): Observable<any> {
    if (sessionStorage.getItem('token')) {
      return this.http.post(environment.URL_API + '/activeUser', {token: sessionStorage.getItem('token')});
    } else {
      return this.logout();
    }
  }

  enableUsuario(habilitado: number, id: string): Observable<any> {
    return this.http.post(environment.URL_API + '/enableUser', {habilitado, id});
  }

  cambiaEstado(id: number , nivel: EUsuNivel): Observable<any> {
    return this.http.post(environment.URL_API + '/updateNivel', {idUsuario: id, nivel});
  }

}
