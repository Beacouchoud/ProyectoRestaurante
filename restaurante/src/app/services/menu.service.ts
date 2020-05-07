import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPlato } from '../models/plato.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, groupBy } from 'rxjs/operators';
import { IMenu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(protected http: HttpClient) { }

  createMenu(menu: IMenu): Observable<any> {
    return this.http.post(environment.URL_API + '/createMenu', menu);
  }

  editMenu(keys: Array<any>, values: Array<any>) {

  }

  getMenu(id: string): Observable<any>{
    return this.http.post(environment.URL_API + '/getMenu', id);

  }

  getMenusList(): Observable<any> {
    return this.http.get(environment.URL_API + '/getMenusList');
  }



}
