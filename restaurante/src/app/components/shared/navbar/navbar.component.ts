import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Utils } from '../../../models/utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css'
  ]
})
export class NavbarComponent extends Utils implements OnInit {

  constructor( private usuSrv: UsuarioService, private router: Router) {
    super(usuSrv);
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.usuSrv.logout()
    .subscribe(
      () => this.router.navigate(['/login']),
      (error) => console.error(error)
    );
  }
}
