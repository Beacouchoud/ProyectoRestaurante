import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPedido } from 'src/app/models/pedido.model';
import { IOption } from 'ng-select';
import { EEstado } from 'src/app/models/estado-pedido.enum';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-modalinfo',
  templateUrl: './modalinfo.component.html',
  styleUrls: ['./modalinfo.component.css']
})
export class ModalinfoComponent implements OnInit {
  @Input() pedido: IPedido;
  public enumEstados = EEstado;
  estados: Array<IOption> = [
    { label: EEstado.PENDIENTE, value: EEstado.PENDIENTE },
    { label: EEstado.ENTREGADO, value: EEstado.ENTREGADO },
    { label: EEstado.CANCELADO, value: EEstado.CANCELADO, disabled: true },
    { label: EEstado.ACEPTADO, value: EEstado.ACEPTADO },
  ];

  constructor(public modal: NgbActiveModal, private pdSrv: PedidoService) { }

  ngOnInit(): void {
  }

  public onSelectChange(newValue: IOption, pedido: IPedido): void {
    this.pdSrv
    .cambiaEstado(pedido.id_pedido, newValue.value as EEstado)
    .subscribe((res) => pedido.estado = res );
  }
}
