import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoformComponent } from './platoform.component';

describe('PlatoformComponent', () => {
  let component: PlatoformComponent;
  let fixture: ComponentFixture<PlatoformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatoformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
