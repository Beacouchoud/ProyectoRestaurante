import { IPlato } from './plato.model';

export interface IMenu {
  idMenu: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  platos: Array<any>;
  precio: number;
  habilitado: boolean;
}
