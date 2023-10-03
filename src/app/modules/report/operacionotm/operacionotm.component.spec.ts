import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionotmComponent } from './operacionotm.component';

describe('OperacionotmComponent', () => {
  let component: OperacionotmComponent;
  let fixture: ComponentFixture<OperacionotmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionotmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionotmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
