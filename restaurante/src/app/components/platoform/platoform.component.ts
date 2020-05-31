import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {IOption} from 'ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ETipoPlato } from 'src/app/models/plato-tipo';
import { PlatoService } from 'src/app/services/plato.service';
import { IPlato } from 'src/app/models/plato.model';

@Component({
  selector: 'app-platoform',
  templateUrl: './platoform.component.html',
  styles: [
  ]
})
export class PlatoformComponent implements OnInit {

  public form: FormGroup;
  public msg: string;
  public error: boolean = null;
  public platoSeleccionado: IPlato;
  tiposPlato: Array<IOption> = [
    {label: ETipoPlato.ENTRANTE , value: ETipoPlato.ENTRANTE},
    {label: ETipoPlato.ARROZ, value: ETipoPlato.ARROZ},
    {label: ETipoPlato.CARNE, value: ETipoPlato.CARNE},
    {label: ETipoPlato.PESCADO, value: ETipoPlato.PESCADO},
    {label: ETipoPlato.POSTRE , value: ETipoPlato.POSTRE}
 ];


 @Output() collapseEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
 isCollapsed:boolean = false;

  constructor(private formBuilder: FormBuilder, private pltSrv: PlatoService) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.form = this.formBuilder.group({
      nombre: [ !this.platoSeleccionado ? null : this.platoSeleccionado.nombre_plato , [Validators.required]],
      tipo: [ !this.platoSeleccionado ? null : this.platoSeleccionado.tipo  , [Validators.required]],
      precio: [ !this.platoSeleccionado ? null : this.platoSeleccionado.precio  , [Validators.required]],
      descripcion: [ !this.platoSeleccionado ? null : this.platoSeleccionado.descripcion  , []],
      habilitado: [!this.platoSeleccionado ? 1 : this.platoSeleccionado.habilitado , [Validators.required]]
    });
  }

  public creaPlato(): void {
    this.error = null; this.msg = '';
    if (this.platoSeleccionado) {
      this.error = null;
      this.msg = '';
      this.pltSrv.updatePlato(this.platoSeleccionado.id_plato.toString() ,this.form.getRawValue())
      .subscribe(
        (res) => {
          if (res.affectedRows === 0) {
            this.msg = 'No se ha podido actualizar el plato',
            this.error = true;
          } else {
            this.msg = 'Plato actualizado correctamente',
            this.error = false;
            this.platoSeleccionado = null;
            setTimeout(() => {
              this.cerrarPlato(); this.error = null; this.msg = '';
            }, 2000);
          }
        },
        (error) => {
          if (error.error.code === 'ER_DUP_ENTRY') {
            this.msg = 'Ya existe un plato con este nombre';
          }
          else {
            this.msg = 'No se ha podido actualizar el plato';
          }
          this.error = true;
        }
      );
    } else {
      this.error = null;
      this.msg = '';
      this.pltSrv.createPlato(this.form.getRawValue())
      .subscribe(
        () => {
          this.msg = 'Plato creado correctamente',
          this.error = false;
          this.platoSeleccionado = null;
          setTimeout(() => {
            this.cerrarPlato();this.error = null; this.msg = '';
          }, 2000);
        },
        (error) => {
          if (error.error.code === 'ER_DUP_ENTRY') {
            this.msg = 'Ya existe un plato con este nombre';
          }
          else {
            this.msg = 'No se ha podido crear el plato';
          }
          this.error = true;
        }
      );
    }
  }

  public cerrarPlato() {
    this.collapseEvent.emit(true);
    this.error = null; this.msg = '';
  }
}
