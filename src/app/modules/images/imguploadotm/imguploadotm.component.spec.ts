import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImguploadotmComponent } from './imguploadotm.component';

describe('ImguploadotmComponent', () => {
  let component: ImguploadotmComponent;
  let fixture: ComponentFixture<ImguploadotmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImguploadotmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImguploadotmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
