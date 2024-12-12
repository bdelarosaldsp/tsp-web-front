import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImglistComponent } from './imglist.component';

describe('ImglistComponent', () => {
  let component: ImglistComponent;
  let fixture: ComponentFixture<ImglistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImglistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
