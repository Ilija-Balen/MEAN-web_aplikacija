import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminloggedComponent } from './adminlogged.component';

describe('AdminloggedComponent', () => {
  let component: AdminloggedComponent;
  let fixture: ComponentFixture<AdminloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminloggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
