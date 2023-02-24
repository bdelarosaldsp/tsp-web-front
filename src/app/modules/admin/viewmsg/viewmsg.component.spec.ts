import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmsgComponent } from './viewmsg.component';

describe('ViewmsgComponent', () => {
  let component: ViewmsgComponent;
  let fixture: ComponentFixture<ViewmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
