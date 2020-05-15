import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../models/usuario.model';
import { IPedido, IDetalle } from '../models/pedido.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EEstado } from '../models/estado-pedido.enum';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(protected http: HttpClient) { }


  createPedido(usuario: IUsuario, pedido: IPedido): Observable<any> {
    return this.http.post(environment.URL_API + '/createPedido', {usuario, pedido, detalle: pedido.detalle_pedido});
  }

  listaPedidos(): Observable<any> {
    return this.http.get(environment.URL_API + '/getPedidosList').pipe(
      map(pedido => pedido as Array<IPedido>)
    );
  }

  detalleFromPedidos(id: string): Observable<any> {
    return this.http.get(environment.URL_API + '/getDetalleFromPedido', {params: {'idPedido': id } } ).pipe(
      map(detalles => detalles as Array<IDetalle>)
    );
  }

  cambiaEstado(id: number , estado: EEstado): Observable<any> {
    return this.http.post(environment.URL_API + '/updateEstado', {idPedido: id, estado})
  }
}

