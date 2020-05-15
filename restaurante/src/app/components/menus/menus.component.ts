import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Utils } from '../shared/utils';
import { MenuService } from 'src/app/services/menu.service';
import { IMenu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styles: [
  ]
})
export class MenusComponent extends Utils implements OnInit {

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

  private menu;

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
}
