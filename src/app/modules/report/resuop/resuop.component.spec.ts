import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResuopComponent } from './resuop.component';

describe('ResuopComponent', () => {
  let component: ResuopComponent;
  let fixture: ComponentFixture<ResuopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResuopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResuopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
