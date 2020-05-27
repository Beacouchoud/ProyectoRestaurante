import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPedido } from 'src/app/models/pedido.model';
import { IOption } from 'ng-select';
import { EEstado } from 'src/app/models/estado-pedido.enum';
import { PedidoService } from 'src/app/services/pedido.service';
import { IUsuario } from 'src/app/models/usuario.model';
import { EUsuNivel } from 'src/app/models/usuario-nivel.enum';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modalinfo',
  templateUrl: './modalinfo.component.html',
  styleUrls: ['./modalinfo.component.css']
})
export class ModalinfoComponent implements OnInit {

  @Input() tipo: string;
  @Input() pedido: IPedido;
  @Input() usuario: IUsuario;

  public enumEstados = EEstado;
  estados: Array<IOption> = [
    { label: EEstado.PENDIENTE, value: EEstado.PENDIENTE },
    { label: EEstado.ENTREGADO, value: EEstado.ENTREGADO },
    { label: EEstado.CANCELADO, value: EEstado.CANCELADO, disabled: true },
    { label: EEstado.ACEPTADO, value: EEstado.ACEPTADO },
  ];

  niveles: Array<IOption> = [
    { label: 'CLIENTE', value: EUsuNivel.CLIENTE },
    { label: 'EMPLEADO', value: EUsuNivel.EMPLEADO },
    { label: 'ADMINISTRADOR', value: EUsuNivel.ADMINISTRADOR }
  ];

  constructor(public modal: NgbActiveModal, private pdSrv: PedidoService, private usuSrv: UsuarioService,) { }

  ngOnInit(): void {
  }

  public onSelectPedidoChange(newValue: IOption, pedido: IPedido): void {
    this.pdSrv
    .cambiaEstado(pedido.id_pedido, newValue.value as EEstado)
    .subscribe((res) => pedido.estado = res );
  }
  public onSelectUserChange(newValue: IOption, usuario: IUsuario): void {
    this.usuSrv
    .cambiaEstado(usuario.id_usuario, newValue.value as unknown as EUsuNivel)
    .subscribe((res) => usuario.nivel = res );
  }

  public onCancelPedido(pedido: IPedido) {
    this.pdSrv
      .cambiaEstado(pedido.id_pedido, EEstado.CANCELADO)
      .subscribe((res) => {
        this.modal.close('Close click');
        return pedido.estado = res;
      } );
  }
}
