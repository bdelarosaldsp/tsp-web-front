import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtmvalimgComponent } from './otmvalimg.component';

describe('OtmvalimgComponent', () => {
  let component: OtmvalimgComponent;
  let fixture: ComponentFixture<OtmvalimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtmvalimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtmvalimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
