import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmsreportsComponent } from './wmsreports.component';

describe('WmsreportsComponent', () => {
  let component: WmsreportsComponent;
  let fixture: ComponentFixture<WmsreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WmsreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WmsreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
