import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IUsuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: IUsuario;
  public form: FormGroup;
  public error: boolean;
  public errorCode: string;
  public msg: string;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.minLength(8), Validators.required]]
    });
  }

  public login(): void {
    if (this.form.valid) {
      this.usuarioService.login(this.form.getRawValue())
      .subscribe(
        (usu: any) => {
          if (usu.habilitado === 1) {
            this.usuario = usu;
            this.router.navigate(['/home']);
          } else {
            this.msg = 'Usuario o contraseña incorrectos';
            this.error = true;
          }
        },
        (error) => {this.handleError(error)}
      );
    } else {
      this.msg = 'Rellene correctamente todos los campos';
      this.error = true;
    }
  }

  handleError(error: HttpErrorResponse) {
    console.log(error);
    this.errorCode = error.error.code;
    this.msg = error.error.message;
    this.error = true;
  }
}
