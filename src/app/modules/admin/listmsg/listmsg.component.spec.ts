import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmsgComponent } from './listmsg.component';

describe('ListmsgComponent', () => {
  let component: ListmsgComponent;
  let fixture: ComponentFixture<ListmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
