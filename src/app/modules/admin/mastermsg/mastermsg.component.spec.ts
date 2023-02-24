import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastermsgComponent } from './mastermsg.component';

describe('MastermsgComponent', () => {
  let component: MastermsgComponent;
  let fixture: ComponentFixture<MastermsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MastermsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MastermsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
