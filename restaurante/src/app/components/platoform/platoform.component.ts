import { Component, OnInit } from '@angular/core';
import {IOption} from 'ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ETipoPlato } from 'src/app/models/plato-tipo';
import { PlatoService } from 'src/app/services/plato.service';

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
  tiposPlato: Array<IOption> = [
    {label: 'Selecciona tipo' , value: ''},
    {label: ETipoPlato.ENTRANTE , value: ETipoPlato.ENTRANTE},
    {label: ETipoPlato.ARROZ, value: ETipoPlato.ARROZ},
    {label: ETipoPlato.CARNE, value: ETipoPlato.CARNE},
    {label: ETipoPlato.PESCADO, value: ETipoPlato.PESCADO},
    {label: ETipoPlato.POSTRE , value: ETipoPlato.POSTRE}
 ];

  constructor(private formBuilder: FormBuilder, private pltSrv: PlatoService) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      nombre: [[ null ], [Validators.required]],
      tipo: [[ '' ], [Validators.required]],
      precio: [[ null ], [Validators.required]],
      descripcion: [[ null ], []],
      habilitado: [[true], [Validators.required]]
    });
  }

  public crearPlato(): void {
    this.pltSrv.createPlato(this.form.getRawValue())
    .subscribe(
      () => {
      this.msg = 'Plato creado correctamente',
      this.error = false;
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
