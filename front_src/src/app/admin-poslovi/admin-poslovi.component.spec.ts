import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPosloviComponent } from './admin-poslovi.component';

describe('AdminPosloviComponent', () => {
  let component: AdminPosloviComponent;
  let fixture: ComponentFixture<AdminPosloviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPosloviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPosloviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
