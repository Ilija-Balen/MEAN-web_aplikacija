import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrvaKlijentComponent } from './prva-klijent.component';

describe('PrvaKlijentComponent', () => {
  let component: PrvaKlijentComponent;
  let fixture: ComponentFixture<PrvaKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrvaKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrvaKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
