import { IPlato } from './plato.model';

export interface IMenu {
  id_menu: number;
  nombre_menu: string;
  descripcion: string;
  imagen: string;
  platos: Array<IPlato>;
  precio: number;
  habilitado: number;
}
