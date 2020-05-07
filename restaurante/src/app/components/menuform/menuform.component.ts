import { Component, OnInit, OnDestroy } from '@angular/core';
import {IOption} from 'ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatoService } from 'src/app/services/plato.service';
import { IPlato } from 'src/app/models/plato.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menuform',
  templateUrl: './menuform.component.html',
  styles: [
  ]
})
export class MenuformComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private platos: Array<IPlato>;


  constructor(private fb: FormBuilder, private pltSrv: PlatoService, private mnSrv: MenuService) {
    this.platos = new Array();
  }

  ngOnInit(): void {
    this.listaPlatos();
    this.initForm();
  }

  ngOnDestroy(): void {

  }

  private initForm(): void {
    this.form = this.fb.group({
      nombre: [null, []],
      descripcion: [null, []],
      imagen: [null, []],
      platos: [[ ], [Validators.required]],
      precioReal: [{value: null, disabled: true}, []],
      precio: [null, []],
      habilitado: [1, []]
    });
    this.handlePlatosChange();
  }

  private handlePlatosChange(): void {
    this.form.controls.platos.valueChanges.subscribe((platosSelected: Array<number>) => {
      this.form.controls.precioReal.setValue(this.findPrecios(platosSelected));
    });
  }

  public get opciones(): Array<IPlato> {
    return this.platos;
  }

  public creaMenu() {
    this.mnSrv.createMenu(this.form.getRawValue())
    .subscribe(
      (menu) => console.log(menu),
      (error) => console.log(error)
    );
  }

  public listaPlatos(): void {
    this.pltSrv.listaPlatos()
    .subscribe(
      (platos) => this.platos = platos,
      (error) => {
        console.log(error);
      }
    );
  }

  private findPrecios(platos: Array<number>): number {
    let precioTotal = 0;
    platos.map(idPlato => this.platos.find((plato: IPlato) => plato.id_plato === idPlato).precio).forEach(precio => precioTotal += precio);
    return precioTotal;
  }
}
