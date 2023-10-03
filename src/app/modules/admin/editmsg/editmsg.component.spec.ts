import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmsgComponent } from './editmsg.component';

describe('EditmsgComponent', () => {
  let component: EditmsgComponent;
  let fixture: ComponentFixture<EditmsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
