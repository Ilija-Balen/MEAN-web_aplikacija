import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrecaKlijentComponent } from './treca-klijent.component';

describe('TrecaKlijentComponent', () => {
  let component: TrecaKlijentComponent;
  let fixture: ComponentFixture<TrecaKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrecaKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrecaKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
