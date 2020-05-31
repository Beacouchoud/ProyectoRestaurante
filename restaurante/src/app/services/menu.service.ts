import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPlato } from '../models/plato.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IMenu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(protected http: HttpClient) { }

  createMenu(menu: IMenu): Observable<any> {
    return this.http.post(environment.URL_API + '/createMenu', menu);
  }

  editMenu(keys: Array<any>, values: Array<any>) { //TO-DO
  }

  enableMenu(habilitado: number, id: string): Observable<any> {
    return this.http.post(environment.URL_API + '/enableMenu', {habilitado, id});
  }

  getMenu(id: string): Observable<any>{
    return this.http.post(environment.URL_API + '/getMenu', id);
  }

  getMenusList(): Observable<any> {
    return this.http.get(environment.URL_API + '/getMenusList').pipe(
      map(menus => menus as Array<IMenu>)
    );
  }

  getPlatosFromMenu(id: string): Observable<any> {
    return this.http.get(environment.URL_API + '/getPlatosFromMenu', {params: {'idMenu': id } } ).pipe(
      map(platos => platos as Array<IPlato>)
    );
  }

  updateMenu(id: string, menu: IMenu): Observable<any> {
    return this.http.post(environment.URL_API + '/updateMenu', {menu, id});
  }
}
