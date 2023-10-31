import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransmisionotmComponent } from './transmisionotm.component';

describe('TransmisionotmComponent', () => {
  let component: TransmisionotmComponent;
  let fixture: ComponentFixture<TransmisionotmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransmisionotmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransmisionotmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
