import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAzurirajComponent } from './admin-azuriraj.component';

describe('AdminAzurirajComponent', () => {
  let component: AdminAzurirajComponent;
  let fixture: ComponentFixture<AdminAzurirajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAzurirajComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAzurirajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
