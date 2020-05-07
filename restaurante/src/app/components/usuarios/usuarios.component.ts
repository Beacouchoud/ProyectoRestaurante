import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  private users: Array<IUsuario>;

  constructor(private usuSrv: UsuarioService) {
    this.users = new Array();
  }

  ngOnInit(): void {
    this.listaUsuarios();
  }

  public get usuarios(): Array<IUsuario> {
    return this.users;
  }

  public listaUsuarios(): void {
    this.usuSrv.listaUsuarios()
    .subscribe(
      (usuarios) => {
        this.users = usuarios;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
