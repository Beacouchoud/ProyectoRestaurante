import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/models/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Utils } from 'src/app/models/utils';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styles: [],
})
export class MicuentaComponent extends Utils implements OnInit {
  public usuario: IUsuario;
  public form: FormGroup;
  public formPwd: FormGroup;
  public error: boolean;
  public errorCode: string;
  public msg: string;

  constructor(private fb: FormBuilder, private usuSrv: UsuarioService) {
    super(usuSrv);
  }

  ngOnInit(): void {
    this.usuario = this.userLogged;
    if (!this.usuario) {
      this.usuSrv.getActiveUser().subscribe((loggedUser: IUsuario) => {
        this.usuario = loggedUser;
        console.log('usuario0',loggedUser);
        this.initForm();
      });
    } else {
      this.initForm();
    }
    console.log('usu', this.usuario);
  }

  private initForm(): void {
    this.form = this.fb.group({
      apellido: [
        this.usuario.apellido,
        [Validators.pattern('[a-zA-ZÑñ ]*'), Validators.required],
      ],
      nombre: [
        this.usuario.nombre,
        [Validators.pattern('[a-zA-ZÑñ ]*'), Validators.required],
      ],
      direccion: [this.usuario.direccion, [Validators.required]],
      email: [this.usuario.email, [Validators.email, Validators.required]],
      password: [
        this.usuario.password,
        [Validators.minLength(8), Validators.required],
      ],
      telefono: [
        this.usuario.telefono,
        [Validators.pattern('[0-9]*'), Validators.required],
      ],
    });
    this.formPwd = this.fb.group({
      password: [null, [Validators.minLength(8), Validators.required]],
      newPassword1: [null, [Validators.minLength(8), Validators.required]],
      newPassword2: [null, [Validators.minLength(8), Validators.required]],
    });
  }

  public modificarDatos(): void {
    if (this.form.valid) {
      this.usuSrv
        .updateUsuario(
          this.usuario.id_usuario.toString(),
          this.form.getRawValue()
        )
        .subscribe(
          (usu: IUsuario) => (this.usuario = usu),
          (error) => this.handleError(error)
        );
    }
  }

  public modificarPassword(): void {
    if (this.formPwd.valid) {
      this.usuSrv
        .updateUsuario(
          this.usuario.id_usuario.toString(),
          this.formPwd.getRawValue()
        )
        .subscribe(
          (usu: IUsuario) => (this.usuario = usu),
          (error) => this.handleError(error)
        );
    }
  }

  public hasError(formControlName: string): boolean {
    return (
      this.form.controls[formControlName].errors &&
      this.form.controls[formControlName].dirty
    );
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
