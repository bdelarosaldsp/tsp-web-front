import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmsformatsComponent } from './wmsformats.component';

describe('WmsformatsComponent', () => {
  let component: WmsformatsComponent;
  let fixture: ComponentFixture<WmsformatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WmsformatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WmsformatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
