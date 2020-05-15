import { IPlato } from './plato.model';

export interface IMenu {
  id_menu: number;
  nombre_menu: string;
  descripcion: string;
  imagen: string;
  platos: Array<any>;
  precio: number;
  habilitado: number;
}
