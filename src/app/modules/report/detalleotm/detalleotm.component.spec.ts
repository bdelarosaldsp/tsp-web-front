import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleotmComponent } from './detalleotm.component';

describe('DetalleotmComponent', () => {
  let component: DetalleotmComponent;
  let fixture: ComponentFixture<DetalleotmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleotmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleotmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
