import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [NgbPaginationConfig]
})
export class UsuariosComponent implements OnInit {

  private users: Array<IUsuario>;
  public  totalItems: number;
  public activePage = 1;
  public itemsPerPage = 5;
  public showPagination: boolean;



  constructor(private usuSrv: UsuarioService, private config: NgbPaginationConfig) {
    this.users = new Array();
    this.config.boundaryLinks = true;
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
        if (usuarios.length == 0) {
          this.users = [];
          this.showPagination = false;
        } else {
          this.users = usuarios;
          this.totalItems = usuarios.length;
			    this.showPagination = true;
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

}
