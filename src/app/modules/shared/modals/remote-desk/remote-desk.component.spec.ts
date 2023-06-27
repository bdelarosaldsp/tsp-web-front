import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteDeskComponent } from './remote-desk.component';

describe('RemoteDeskComponent', () => {
  let component: RemoteDeskComponent;
  let fixture: ComponentFixture<RemoteDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoteDeskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
