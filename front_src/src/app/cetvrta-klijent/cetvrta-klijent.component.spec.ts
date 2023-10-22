import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetvrtaKlijentComponent } from './cetvrta-klijent.component';

describe('CetvrtaKlijentComponent', () => {
  let component: CetvrtaKlijentComponent;
  let fixture: ComponentFixture<CetvrtaKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CetvrtaKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CetvrtaKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
