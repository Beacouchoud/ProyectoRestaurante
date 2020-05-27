import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import {NgbPaginationConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { EUsuNivel } from 'src/app/models/usuario-nivel.enum';
import { IOption } from 'ng-select';
import { ModalinfoComponent } from '../shared/modalinfo/modalinfo.component';

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
  niveles: Array<IOption> = [
    { label: 'CLIENTE', value: EUsuNivel.CLIENTE },
    { label: 'EMPLEADO', value: EUsuNivel.EMPLEADO },
    { label: 'ADMINISTRADOR', value: EUsuNivel.ADMINISTRADOR }
  ];


  constructor(private usuSrv: UsuarioService, private config: NgbPaginationConfig, private modalService: NgbModal) {
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

  public habilitarUsuario(usuario: IUsuario) {
    let habilitado = usuario.habilitado ? 0 : 1;
    this.usuSrv.enableUsuario(habilitado, usuario.id_usuario.toString())
      .subscribe(
        (res) => usuario.habilitado = res,
        (error) => console.log('error', error)
      );
  }

  public onSelectChange(newValue: IOption, usuario: IUsuario): void {
    console.info('estado  y pedido', newValue, usuario);
    this.cambiaEstado(newValue, usuario);
  }

  public cambiaEstado(newValue: IOption, usuario: IUsuario): void {
    this.usuSrv
      .cambiaEstado(usuario.id_usuario, newValue.value as unknown as EUsuNivel)
      .subscribe((res) => usuario.nivel = res );
  }

  openVerticallyCentered(usuario: IUsuario, tipo: string) {
    const modal = this.modalService.open(ModalinfoComponent, { centered: true });
    modal.componentInstance.pedido = null;
    modal.componentInstance.usuario = usuario;
    modal.componentInstance.tipo = tipo;
  }

}
