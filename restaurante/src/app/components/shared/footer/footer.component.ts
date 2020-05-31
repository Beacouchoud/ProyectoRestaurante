import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

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
