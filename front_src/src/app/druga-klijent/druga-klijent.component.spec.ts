import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugaKlijentComponent } from './druga-klijent.component';

describe('DrugaKlijentComponent', () => {
  let component: DrugaKlijentComponent;
  let fixture: ComponentFixture<DrugaKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugaKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugaKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
