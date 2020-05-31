import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { IOption } from 'ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatoService } from 'src/app/services/plato.service';
import { IPlato } from 'src/app/models/plato.model';
import { MenuService } from 'src/app/services/menu.service';
import { IMenu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-menuform',
  templateUrl: './menuform.component.html',
  styles: [],
})
export class MenuformComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private platos: Array<IPlato>;
  public msg: string;
  public error: boolean = null;
  public menuSeleccionado: IMenu;

  @Output() collapseEvent:EventEmitter<boolean> = new EventEmitter<boolean>();
  isCollapsed:boolean = false;



  constructor(private fb: FormBuilder, private pltSrv: PlatoService, private mnSrv: MenuService) {
    this.platos = new Array();
  }

  ngOnInit(): void {
    this.listaPlatos();
    this.initForm();
  }

  ngOnDestroy(): void {}

  public initForm(): void {
    console.log('init form menu');
    this.form = this.fb.group({
      nombre: [!this.menuSeleccionado ? null : this.menuSeleccionado.nombre_menu, [Validators.required]],
      descripcion: [!this.menuSeleccionado ? null : this.menuSeleccionado.descripcion, [Validators.required]],
      imagen: [!this.menuSeleccionado ? null : this.menuSeleccionado.imagen, [Validators.required, Validators.pattern('https://.*')]],
      platos: [!this.menuSeleccionado ? null : this.menuSeleccionado.platos, [Validators.required]],
      precioReal: [{ value: !this.menuSeleccionado ? null : this.findPrecios(this.menuSeleccionado.platos), disabled: true }, []],
      precio: [!this.menuSeleccionado ? null : this.menuSeleccionado.precio, [Validators.required]],
      habilitado: [1, []],
    });
    this.handlePlatosChange();
  }

  private handlePlatosChange(): void {
    this.form.controls.platos.valueChanges.subscribe((platosSelected: Array<IPlato>) => {
      this.form.controls.precioReal.setValue(this.findPrecios(platosSelected));
    });
  }

  public get opciones(): Array<IPlato> {
    return this.platos;
  }

  public creaMenu() {
    this.error = null; this.msg = '';
    if (this.menuSeleccionado) {
      this.mnSrv.updateMenu(this.menuSeleccionado.id_menu.toString() ,this.form.getRawValue())
      .subscribe(
        (res) => {
          if (res.affectedRows === 0) {
            this.msg = 'No se ha podido actualizar el menú',
            this.error = true;
          } else {
            this.msg = 'Menú actualizado correctamente',
            this.error = false;
            this.menuSeleccionado = null;
            setTimeout(() => {
              this.cerrarMenu(); this.error = null; this.msg = '';
            }, 2000);
          }
        },
        (error) => {
          if (error.error.code === 'ER_DUP_ENTRY') {
            this.msg = 'Ya existe un menú con este nombre';
          }
          else {
            this.msg = 'No se ha podido actualizar el menú';
          }
          this.error = true;
        }
      );
    } else {
    this.mnSrv.createMenu(this.form.getRawValue())
    .subscribe(
      () => {
        this.msg = 'Menú creado correctamente',
        this.error = false;
        this.menuSeleccionado = null;
        setTimeout(() => {
          this.cerrarMenu(); this.error = null; this.msg = '';
        }, 2000);
      },
      (error) =>{
        if (error.error.code === 'ER_DUP_ENTRY') {
          this.msg = 'Ya existe un menú con este nombre';
        }
        else {
          this.msg = 'No se ha podido crear el menú';
        }
        this.error = true;
      }
    );
    }
  }

  public listaPlatos(): void {
    this.pltSrv.listaPlatos().subscribe(
      (platos) => (this.platos = platos),
      (error) => {
        console.log(error);
      }
    );
  }

  private findPrecios(platos: Array<IPlato>): number {
    let precioTotal = 0;
    platos.map((plato) => plato.precio).forEach((precio) => (precioTotal += precio));
    return precioTotal;
  }
  public cerrarMenu() {
    this.collapseEvent.emit(true);
    this.error = null; this.msg = '';
  }
}
