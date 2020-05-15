import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcancelComponent } from './modalcancel.component';

describe('ModalcancelComponent', () => {
  let component: ModalcancelComponent;
  let fixture: ComponentFixture<ModalcancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
