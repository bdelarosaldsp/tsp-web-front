import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgplauploadComponent } from './imgplaupload.component';

describe('ImgplauploadComponent', () => {
  let component: ImgplauploadComponent;
  let fixture: ComponentFixture<ImgplauploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgplauploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgplauploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
