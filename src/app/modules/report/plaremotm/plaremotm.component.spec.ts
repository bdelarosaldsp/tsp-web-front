import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaremotmComponent } from './plaremotm.component';

describe('PlaremotmComponent', () => {
  let component: PlaremotmComponent;
  let fixture: ComponentFixture<PlaremotmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaremotmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaremotmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
