import { EUsuNivel } from './usuario-nivel.enum';

export interface IUsuario {
  id_usuario: number;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  nivel: EUsuNivel;
  habilitado: boolean;
  sessionId?: string;
}
