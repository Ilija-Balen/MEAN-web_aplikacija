import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDodajComponent } from './admin-dodaj.component';

describe('AdminDodajComponent', () => {
  let component: AdminDodajComponent;
  let fixture: ComponentFixture<AdminDodajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDodajComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDodajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
