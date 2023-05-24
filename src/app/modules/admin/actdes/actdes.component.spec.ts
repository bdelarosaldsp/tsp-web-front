import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActdesComponent } from './actdes.component';

describe('ActdesComponent', () => {
  let component: ActdesComponent;
  let fixture: ComponentFixture<ActdesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActdesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
