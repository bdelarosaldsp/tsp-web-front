import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeterrComponent } from './deterr.component';

describe('DeterrComponent', () => {
  let component: DeterrComponent;
  let fixture: ComponentFixture<DeterrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeterrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeterrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
