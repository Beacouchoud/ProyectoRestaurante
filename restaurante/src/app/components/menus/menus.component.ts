import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Utils } from '../shared/utils';
import { MenuService } from 'src/app/services/menu.service';
import { IMenu } from 'src/app/models/menu.model';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

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
      console.log('MENUS ', JSON.parse(JSON.stringify(this.menu)));
      return this.menu;
    } else {
      console.log('MENUS HABILITADOS', this.menu.filter((element) => element.habilitado === 1));
      return this.menu.filter((element) => element.habilitado === 1);
    }
  }



  private menu;

  ngOnInit(): void {
    this.listaMenus();
  }

  private listaMenus(): void {
  this.mnSrv.getMenusList()
    .subscribe(
      (menus) => this.menu = menus,
      (error) => console.log(error)
    );
}

private ordenaMenus(): void {
  this.menu.map(idMenu => this.menu.find((menu: IMenu) => menu.platos.push()).precio).forEach(precio => precioTotal += precio);
}

}
