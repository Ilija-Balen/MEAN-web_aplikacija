import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkkomentarComponent } from './ckkomentar.component';

describe('CkkomentarComponent', () => {
  let component: CkkomentarComponent;
  let fixture: ComponentFixture<CkkomentarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CkkomentarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CkkomentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
