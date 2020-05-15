import { Component, OnInit } from '@angular/core';
import { IPedido } from 'src/app/models/pedido.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from 'src/app/services/menu.service';
import { EEstado } from 'src/app/models/estado-pedido.enum';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: [],
})
export class PedidosComponent implements OnInit {
  private pedidos: Array<IPedido>;
  public totalItems: number;
  public activePage = 1;
  public itemsPerPage = 4;
  public showPagination: boolean;
  public enumEstados = EEstado;
  estados: Array<IOption> = [
    { label: EEstado.PENDIENTE, value: EEstado.PENDIENTE },
    { label: EEstado.ENTREGADO, value: EEstado.ENTREGADO },
    { label: EEstado.CANCELADO, value: EEstado.CANCELADO, disabled: true },
    { label: EEstado.ACEPTADO, value: EEstado.ACEPTADO },
  ];

  constructor(
    private pdSrv: PedidoService,
    private mnSrv: MenuService,
    private config: NgbPaginationConfig
  ) {
    this.pedidos = new Array<IPedido>();
    this.config.boundaryLinks = true;
  }

  public get pedidosLista(): Array<IPedido> {
    return this.pedidos;
  }

  ngOnInit(): void {
    this.listaPedidos();
    //this.initHandler();
  }

  public listaPedidos(): void {
    this.pdSrv.listaPedidos().subscribe(
      (pedidos) => {
        if (pedidos.length == 0) {
          this.pedidos = [];
          this.showPagination = false;
        } else {
          this.pedidos = pedidos;
          this.totalItems = pedidos.length;
          this.showPagination = true;
          this.detallesDelPedido();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private detallesDelPedido(): void {
    this.pedidos.forEach((element) => {
      this.pdSrv.detalleFromPedidos(element.id_pedido.toString()).subscribe(
        (detalle) => (element.detalle_pedido = detalle),
        (error) => console.log(error)
      );
    });
  }

  public onSelectChange(newValue: IOption, pedido: IPedido): void {
    console.info('estado  y pedido', newValue, pedido);
    this.cambiaEstado(newValue, pedido);
  }

  public cambiaEstado(newValue: IOption, pedido: IPedido): void {
    this.pdSrv
      .cambiaEstado(pedido.id_pedido, newValue.value as EEstado)
      .subscribe((res) => pedido.estado = res );
  }

  public onCancelPedido(pedido: IPedido) {
    this.pdSrv
      .cambiaEstado(pedido.id_pedido, EEstado.CANCELADO)
      .subscribe((res) => pedido.estado = res );
  }

}
