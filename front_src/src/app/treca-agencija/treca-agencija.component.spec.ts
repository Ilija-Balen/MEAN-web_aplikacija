import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrecaAgencijaComponent } from './treca-agencija.component';

describe('TrecaAgencijaComponent', () => {
  let component: TrecaAgencijaComponent;
  let fixture: ComponentFixture<TrecaAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrecaAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrecaAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
