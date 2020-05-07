import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario: IUsuario;
  public form: FormGroup;
  public error: boolean;
  public errorCode: string;
  public msg: string;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      apellido: [!this.usuario ? null : this.usuario.apellido , [Validators.pattern('[a-zA-ZÑñ ]*'), Validators.required]],
      nombre: [!this.usuario ? null : this.usuario.nombre , [Validators.pattern('[a-zA-ZÑñ ]*'), Validators.required]],
      direccion: [!this.usuario ? null : this.usuario.direccion, [Validators.required]],
      email: [!this.usuario ? null : this.usuario.email , [Validators.email, Validators.required]],
      habilitado: [!this.usuario ? true : this.usuario.habilitado, [Validators.required]],
      nivel: [!this.usuario ? 1 : this.usuario.nivel, [Validators.required]],
      password: [!this.usuario ? null : this.usuario.password, [Validators.minLength(8), Validators.required]],
      telefono: [!this.usuario ? null : this.usuario.telefono, [Validators.pattern('[0-9]*'), Validators.required]]
    });
  }

  public registrarse(): void {
    if (this.form.valid) {
     // if (this.usuario.idUsuario) {

     // } else {

        this.usuarioService.createUsuario(this.form.getRawValue())
        .subscribe((usu: IUsuario) => this.usuario = usu,
                  (error) => this.handleError(error));
     // }
    }
  }

  public hasError(formControlName: string): boolean {
    return this.form.controls[formControlName].errors && this.form.controls[formControlName].dirty;
  }

  handleError(error: HttpErrorResponse) {
      this.errorCode = error.error.code;
      if (this.errorCode === 'ER_DUP_ENTRY') {
        this.msg = 'El email ya está en uso';
      } else {
        this.msg = error.error.message;
      }
      this.error = true;
    }
}
