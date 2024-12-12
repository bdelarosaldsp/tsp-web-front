import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgsearchComponent } from './imgsearch.component';

describe('ImgsearchComponent', () => {
  let component: ImgsearchComponent;
  let fixture: ComponentFixture<ImgsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
