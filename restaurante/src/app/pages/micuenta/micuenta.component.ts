import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/models/usuario.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Utils } from 'src/app/models/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.component.html',
  styles: [],
})
export class MicuentaComponent extends Utils implements OnInit {
  public usuario: IUsuario;
  public formUserData: FormGroup;
  public formPwd: FormGroup;
  public error1: boolean;
  public msg1: string;
  public error2: boolean;
  public msg2: string;

  constructor(private fb: FormBuilder, private usuSrv: UsuarioService, private router: Router) {
    super(usuSrv);
  }

  ngOnInit(): void {
    this.usuario = this.userLogged;
    if (!this.usuario) {
      this.usuSrv.getActiveUser().subscribe((loggedUser: IUsuario) => {
        this.usuario = loggedUser;
        if (!this.usuario) {
          sessionStorage.removeItem('token');
          this.router.navigate(['/login']);
        } else {
          this.initForm();
        }
      });
    } else {
      this.initForm();
    }
    console.log('usu', this.usuario);
  }

  private initForm(): void {
    this.formUserData = this.fb.group({
      apellido: [
        this.usuario.apellido || null,
        [Validators.pattern('[a-zA-ZÑñ ]*'), Validators.required],
      ],
      nombre: [
        this.usuario.nombre || null,
        [Validators.pattern('[a-zA-ZÑñ ]*'), Validators.required],
      ],
      direccion: [this.usuario.direccion || null, [Validators.required]],
      email: [this.usuario.email || null, [Validators.email, Validators.required]],
      telefono: [
        this.usuario.telefono || null,
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
    if (this.formUserData.valid) {
      this.usuSrv.updateUsuario(
          this.usuario.id_usuario.toString(),
          this.formUserData.getRawValue()
        ).subscribe(
          (res) => {this.msg1 = 'Datos modificados correctamente';this.error1 = false;
            setTimeout(() => {
              this.error1 = null; this.msg1 = '';
            }, 2000);
          },
          (error) =>{
            if (error.error.code === 'ER_DUP_ENTRY') {
              this.msg1 = 'Este email ya esta en uso';
            }
            else {
              this.msg1 = 'No se ha podido modificar el usuario';
            }
            this.error1 = true;
          }
        );
    }
  }

  public modificarPassword(): void {
    console.log('aa');
    if (this.formPwd.valid) {
      console.log('valido');
      if (this.formPwd.getRawValue().newPassword1.toString() === this.formPwd.getRawValue().newPassword2.toString()) {
        console.log('coinciden');
        this.usuSrv.updatePwd(this.usuario.id_usuario.toString(), this.formPwd.getRawValue())
            .subscribe(
            (res) => {
              if (res.affectedRows === 0) {
                this.msg2 = 'La contraseña actual no coincide';
                this.error2 = true;
              } else {
                this.msg2 = 'Contraseña actualizada correctamente';
                this.error2 = false;
                setTimeout(() => {
                  this.error1 = null; this.msg1 = '';
                }, 2000);
              }
            },
            (error) => {
              this.msg2 = 'No se ha podido modificar la contraseña';
              this.error2 = true;
            });
      } else {
        console.log('no coinciden');
        this.msg2 = 'La nueva contraseña no coincide';
        this.error2 = true;
      }
    } else {
      this.msg2 = 'Hay errores en el formulario';
      this.error2 = true;
    }
  }
}
