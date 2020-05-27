import { Component, OnInit } from '@angular/core';
import { Utils } from '../../models/utils';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styles: [
  ]
})
export class JumbotronComponent extends Utils implements OnInit {

  constructor(private usuSrv: UsuarioService) {
    super(usuSrv);
  }

  ngOnInit(): void {
  }

}
