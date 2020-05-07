import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Utils } from 'src/app/components/shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent extends Utils implements OnInit {

  constructor(private usuSrv: UsuarioService) {
    super(usuSrv);
  }

  ngOnInit(): void {
  }

}
