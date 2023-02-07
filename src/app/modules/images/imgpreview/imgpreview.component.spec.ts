import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgpreviewComponent } from './imgpreview.component';

describe('ImgpreviewComponent', () => {
  let component: ImgpreviewComponent;
  let fixture: ComponentFixture<ImgpreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgpreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
