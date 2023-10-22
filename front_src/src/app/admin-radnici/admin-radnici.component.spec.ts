import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRadniciComponent } from './admin-radnici.component';

describe('AdminRadniciComponent', () => {
  let component: AdminRadniciComponent;
  let fixture: ComponentFixture<AdminRadniciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRadniciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRadniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
