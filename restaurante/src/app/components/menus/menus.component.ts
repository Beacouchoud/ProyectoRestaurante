import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Utils } from '../../models/utils';
import { MenuService } from 'src/app/services/menu.service';
import { IMenu } from 'src/app/models/menu.model';
import { MenuformComponent } from '../menuform/menuform.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styles: [
  ]
})
export class MenusComponent extends Utils implements OnInit {

  private menu;
  public isCollapsed = true;
  @ViewChild(MenuformComponent) menuFormComponent: MenuformComponent;

  constructor(private usuSrv: UsuarioService, private mnSrv: MenuService) {
    super(usuSrv);
    this.menu = new Array<IMenu>();
  }

  public get menus(): Array<IMenu> {
    if (this.isAdmin) {
      return this.menu;
    } else {
      return this.menu.filter((element) => element.habilitado == 1);
    }
  }

  ngOnInit(): void {
    this.listaMenus();
  }

  private listaMenus(): void {
  this.mnSrv.getMenusList()
    .subscribe(
      (menus) => {this.menu = menus; this.platosDelMenu();},
      (error) => console.log(error)
    );
  }

  private platosDelMenu(): void {
    this.menu.forEach(element => {
      this.mnSrv.getPlatosFromMenu(element.id_menu.toString())
      .subscribe(
        (platos) => element.platos = platos,
        (error) => console.log(error)
      );
    });
  }

  public habilitarMenu(menu: IMenu): void {
    let habilitado = menu.habilitado ? 0 : 1;
    this.mnSrv.enableMenu(habilitado, menu.id_menu.toString())
      .subscribe(
        (res) => menu.habilitado = res,
        (error) => console.log('error', error)
      );
    }

    public modificarMenu(menu: IMenu): void {
      this.menuFormComponent.menuSeleccionado = menu;
      this.menuFormComponent.initForm();
      this.isCollapsed = false;
      this.scrollTo('menus');
    }

    public nuevoMenu() {
      this.menuFormComponent.menuSeleccionado = null;
      this.menuFormComponent.initForm();
      this.isCollapsed = false;
      this.scrollTo('menus');
    }

    public scrollTo(ancla: string) {
      let x = document.querySelector("#"+ancla);
      if (x){
        x.scrollIntoView({block: "start", behavior: "smooth"});
      }
      return false;
    }
  }
