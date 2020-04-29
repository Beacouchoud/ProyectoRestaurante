import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicuentaComponent } from './micuenta.component';

describe('MicuentaComponent', () => {
  let component: MicuentaComponent;
  let fixture: ComponentFixture<MicuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
