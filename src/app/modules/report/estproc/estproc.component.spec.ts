import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstprocComponent } from './estproc.component';

describe('EstprocComponent', () => {
  let component: EstprocComponent;
  let fixture: ComponentFixture<EstprocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstprocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstprocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
