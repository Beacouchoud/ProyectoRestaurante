import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';
import { Utils } from '../shared/utils';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { IUsuario } from 'src/app/models/usuario.model';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: [
  ]
})
export class PedidoComponent extends Utils implements OnInit {

  public form: FormGroup;ç
  private opciones: Array<IMenu>;
  private user: IUsuario;

  constructor(private fb: FormBuilder, private mnuSrv: MenuService, private usuSrv: UsuarioService, private pdSrv: PedidoService) {
    super(usuSrv);
    this.opciones = new Array<IMenu>();
  }

  ngOnInit(): void {
    this.user = this.userLogged;
    this.cargaOpciones();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: [this.user.nombre, []],
      apellido: [this.user.apellido, []],
      direccion: [this.user.direccion, []],
      email: [this.user.email, []],
      fecha: [[null], []],
      telefono: [this.user.telefono, []],
      pago: [null, []],
      detalle_pedido: this.fb.array(this.initialiceDetallePedido())
    });

    console.log('formulario', this.form)
  }

  private initialiceDetallePedido(): Array<FormGroup> {
    return this.opciones.map(element =>
      this.fb.group({
        'menu': [false, []],
        'id': [element.id_menu, []],
        'nombre_menu': [element.nombre_menu, []],
        'cantidad': [0, []]
      })
    );
  }

  public get menus(): Array<IMenu> {
    return this.opciones;
  }

  public get isValid(): boolean {
    return (this.form.controls.detalle_pedido as FormArray).controls.some((fg: FormGroup) => fg.controls.menu.value)
  }

  private cargaOpciones() {
    this.mnuSrv.getMenusList()
    .subscribe(
      (menus) => {
        this.opciones = menus.filter((element) => element.habilitado == 1);
        this.initForm();
      },
      (error) => console.log(error)
    );
  }

  public creaPedido() {
    this.pdSrv.createPedido(this.userLogged, this.form.getRawValue())
    .subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
  }


}
