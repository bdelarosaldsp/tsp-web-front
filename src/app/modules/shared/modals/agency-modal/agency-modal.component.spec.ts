import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyModalComponent } from './agency-modal.component';

describe('AgencyModalComponent', () => {
  let component: AgencyModalComponent;
  let fixture: ComponentFixture<AgencyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
