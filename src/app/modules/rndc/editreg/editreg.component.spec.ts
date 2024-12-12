import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditregComponent } from './editreg.component';

describe('EditregComponent', () => {
  let component: EditregComponent;
  let fixture: ComponentFixture<EditregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditregComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
