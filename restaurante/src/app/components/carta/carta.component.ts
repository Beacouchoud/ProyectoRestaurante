import { Component, OnInit, ViewChild } from '@angular/core';
import { IPlato } from 'src/app/models/plato.model';
import { PlatoService } from 'src/app/services/plato.service';
import { ETipoPlato } from 'src/app/models/plato-tipo';
import { Utils } from '../../models/utils';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PlatoformComponent } from '../platoform/platoform.component';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styles: [
  ]
})
export class CartaComponent extends Utils implements OnInit {

  private platosCarta: Array<IPlato>;
  public isCollapsed = true;

  @ViewChild(PlatoformComponent) platoFormComponent: PlatoformComponent;
  constructor(private pltSrv: PlatoService, private usuSrv: UsuarioService) {
    super(usuSrv);
    this.platosCarta = new Array();
   }

  ngOnInit(): void {
    this.listaPlatos();
  }

  public get platos(): Array<IPlato> {
    if (this.isAdmin) {
      return this.platosCarta;
    } else {
      return this.platosCarta.filter((element) => element.habilitado == 1);
    }
  }

  public get entrantes(): Array<IPlato> {
    return this.platos.filter((element) => element.tipo === ETipoPlato.ENTRANTE);
  }

  public get arroces(): Array<IPlato> {
    return this.platosCarta.filter((element) => element.tipo === ETipoPlato.ARROZ);
  }

  public get carnes(): Array<IPlato> {
    return this.platosCarta.filter((element) => element.tipo === ETipoPlato.CARNE);
  }

  public get pescados(): Array<IPlato> {
    return this.platosCarta.filter((element) => element.tipo === ETipoPlato.PESCADO);
  }

  public get postres(): Array<IPlato> {
    return this.platosCarta.filter((element) => element.tipo === ETipoPlato.POSTRE);
  }

  public listaPlatos(): void {
    this.pltSrv.listaPlatos()
    .subscribe(
      (platos) => {
        this.platosCarta = platos,
        console.log(this.platosCarta);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public habilitarPlato(plato: IPlato) {
    let habilitado = plato.habilitado == 1 ? 0 : 1;
    this.pltSrv.enablePlato(habilitado, plato.id_plato.toString())
      .subscribe(
        (res) => plato.habilitado = res,
        (error) => console.log('error', error)
      );
  }

  public modificarPlato(plato: IPlato): void {
    this.platoFormComponent.platoSeleccionado = plato;
    this.platoFormComponent.initForm();
    this.isCollapsed = false;
    this.scrollTo('carta');
  }

  public nuevoPlato() {
    this.platoFormComponent.platoSeleccionado = null;
    this.platoFormComponent.initForm();
    this.isCollapsed = false;
    this.scrollTo('carta');
  }

  public scrollTo(ancla: string) {
    let x = document.querySelector("#"+ancla);
    if (x){
      x.scrollIntoView({block: "start", behavior: "smooth"});
    }
    return false;
  }

}



