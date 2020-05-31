import { Component, OnInit } from '@angular/core';
import { Utils } from '../../models/utils';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styles: [
  ]
})
export class JumbotronComponent extends Utils implements OnInit {

  constructor(private usuSrv: UsuarioService, private router: Router) {
    super(usuSrv);
  }

  ngOnInit(): void {
  }

  public scrollTo(ancla) {
    let x = document.querySelector("#"+ancla);
    if (x){
      x.scrollIntoView({block: "start", behavior: "smooth"});
    } else {
      this.router.navigate(['/home']).then(() => {
        let x = document.querySelector("#"+ancla);
        if (x) {
          x.scrollIntoView({block: "start", behavior: "smooth"});
        }
      });
    }
    return false;
  }
}
