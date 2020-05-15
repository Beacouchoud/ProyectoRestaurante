import { EEstado } from './estado-pedido.enum';


export interface IPedido {
  id_pedido: number;
  id_cliente: number;
  fecha: Date;
  direccion: string;
  telefono: string;
  email: string;
  estado: EEstado;
  forma_pago: string
  precio_total: number;
  detalle_pedido: IDetalle;
}

export interface IDetalle {
  id_pedido: number;
  id_menu: number;
  nombre_menu: string;
  cantidad: number;
}
