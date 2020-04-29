import { Component, OnInit } from '@angular/core';
import {IOption} from 'ng-select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menuform',
  templateUrl: './menuform.component.html',
  styles: [
  ]
})
export class MenuformComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  myOptions: Array<IOption> = [
    {label: 'Belgium', value: 'BE'},
    {label: 'Luxembourg', value: 'LU'},
    {label: 'Netherlands', value: 'NL'}
];
selectedOptions: Array<IOption> = [
    {label: 'Belgium', value: 'BE'},
    {label: 'Luxembourg', value: 'LU'}
];

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      plato1: [[ 'BE' ], [Validators.required]]
    });
  }

}
