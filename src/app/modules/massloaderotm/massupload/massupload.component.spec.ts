import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassuploadComponent } from './massupload.component';

describe('MassuploadComponent', () => {
  let component: MassuploadComponent;
  let fixture: ComponentFixture<MassuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassuploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
