import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';
import { Utils } from '../../models/utils';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/models/usuario.model';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: [],
})
export class PedidoComponent extends Utils implements OnInit {
  public form: FormGroup;
  private opciones: Array<IMenu>;
  private user: IUsuario;
  public precioFinal: number = 0;
  public msg: string;
  public error: boolean = null;
  fecha: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  public fechasDisponibles: string = this.fecha.toISOString().split('T')[0];
  constructor(
    private fb: FormBuilder,
    private mnuSrv: MenuService,
    private usuSrv: UsuarioService,
    private pdSrv: PedidoService
  ) {
    super(usuSrv);
    this.opciones = new Array<IMenu>();
  }

  ngOnInit(): void {
    this.user = this.userLogged;
    this.cargaOpciones();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: [this.user.nombre, [Validators.required]],
      apellido: [this.user.apellido, [Validators.required]],
      direccion: [this.user.direccion, [Validators.required]],
      email: [this.user.email, [Validators.required]],
      fecha: [[null], [Validators.required]],
      telefono: [this.user.telefono, [Validators.required]],
      pago: [null, [Validators.required]],
      precio:  [{value: 0, disabled: true}, [Validators.required]],
      detalle_pedido: this.fb.array(this.initialiceDetallePedido())
    });

    this.handleDetallePedido();
    this.form.controls.precio.valueChanges.subscribe(value => this.precioFinal = value);
    console.log('formulario', this.form);
  }

  private initialiceDetallePedido(): Array<FormGroup> {
    return this.opciones.map((element) =>
      this.fb.group({
        menu: [false, [Validators.required]],
        id: [element.id_menu, [Validators.required]],
        nombre_menu: [element.nombre_menu, [Validators.required]],
        cantidad: [0, [Validators.required]],
      })
    );
  }

  private handleDetallePedido(): void {
    this.form.controls.detalle_pedido['controls'].forEach((formGroup: FormGroup) => {
      formGroup.controls.cantidad.valueChanges.subscribe(() => this.calculaPrecioTotal());
      formGroup.controls.menu.valueChanges.subscribe(() => this.calculaPrecioTotal());
    });
  }

  private calculaPrecioTotal(): void {
    this.form.controls.precio.setValue(0);
    this.form.controls.detalle_pedido['controls'].forEach((formGroup: FormGroup) => {
      const cantidad = formGroup.controls.cantidad.value;
      const precio = this.opciones.find(menu => menu.id_menu === formGroup.controls.id.value).precio;
      if (!isNaN(cantidad) && cantidad > 0 && formGroup.controls.menu.value === true) {
        const precioTotal = parseInt(cantidad, 10) * precio;
        this.form.controls.precio.setValue(this.form.controls.precio.value + precioTotal);
      }
    });
  }

  public get menus(): Array<IMenu> {
    return this.opciones;
  }

  public get isValid(): boolean {
    return (this.form.controls.detalle_pedido as FormArray).controls.some(
      (fg: FormGroup) => fg.controls.menu.value
    );
  }

  private cargaOpciones() {
    this.mnuSrv.getMenusList().subscribe(
      (menus) => {
        this.opciones = menus.filter((element) => element.habilitado == 1);
        this.initForm();
      },
      (error) => console.log(error)
    );
  }

  public creaPedido() {
    this.pdSrv.createPedido(this.userLogged, this.form.getRawValue()).subscribe(
      (res) => {this.error = false; this.msg = 'Pedido realizado correctamente'; setTimeout(this.nuevoPedido, 5000)},
      (error) => {console.log(error); this.error = true; this.msg = 'Ha ocurrido un error al realizar el pedido'}
    );
  }

  public nuevoPedido() {
    this.error = null;
    this.msg = '';
    this.precioFinal = 0;
    this.initForm();
  }
}
