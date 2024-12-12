import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsfindComponent } from './docsfind.component';

describe('DocsfindComponent', () => {
  let component: DocsfindComponent;
  let fixture: ComponentFixture<DocsfindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocsfindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsfindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
