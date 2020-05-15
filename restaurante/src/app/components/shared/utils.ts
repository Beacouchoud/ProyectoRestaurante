import { UsuarioService } from 'src/app/services/usuario.service';
import { EUsuNivel } from 'src/app/models/usuario-nivel.enum';
import { IUsuario } from 'src/app/models/usuario.model';

export class Utils {
  constructor(private userSrv: UsuarioService) {

  }

  public get userLogged(): IUsuario {
    return this.userSrv.getLoggedUser();
  }

  public get userLevel(): EUsuNivel {
    return this.userSrv.getUserLevel();
  }

  public get isLoggedIn(): boolean {
    return this.userSrv.getUserLevel() > 0;
  }

  public get isAdmin(): boolean {
    return this.userSrv.getUserLevel() === EUsuNivel.ADMIN;
  }

  public get isEmployee(): boolean {
    return this.userSrv.getUserLevel() === EUsuNivel.EMPLEADO;
  }

  public get isClient(): boolean {
    return this.userSrv.getUserLevel() === EUsuNivel.CLIENTE;
  }

}
