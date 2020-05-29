import { Component, OnInit } from '@angular/core';
import { IPedido } from 'src/app/models/pedido.model';
import { PedidoService } from 'src/app/services/pedido.service';
import { NgbPaginationConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EEstado } from 'src/app/models/estado-pedido.enum';
import { IOption } from 'ng-select';
import { ModalinfoComponent } from '../shared/modalinfo/modalinfo.component';
import { Utils } from 'src/app/models/utils';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: [],
})
export class PedidosComponent extends Utils implements OnInit {
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

  constructor( private pdSrv: PedidoService, private usuSrv: UsuarioService, private config: NgbPaginationConfig, private modalService: NgbModal) {
    super(usuSrv);
    this.pedidos = new Array<IPedido>();
    this.config.boundaryLinks = true;
  }

  public get pedidosLista(): Array<IPedido> {
    if (this.isEmployee ) {
      this.totalItems = this.pedidos.length;
      return this.pedidos;
    } else if (this.isClient) {
      this.totalItems = this.pedidos.filter((element) => element.id_cliente == this.userLogged.id_usuario).length;
      return this.pedidos.filter((element) => element.id_cliente == this.userLogged.id_usuario);
    }
  }

  ngOnInit(): void {
    this.listaPedidos();
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

  openVerticallyCentered(pedido: IPedido, tipo: string) {
    const modal = this.modalService.open(ModalinfoComponent, { centered: true });
    modal.componentInstance.usuario = null;
    modal.componentInstance.pedido = pedido;
    modal.componentInstance.tipo = tipo;
  }

}
