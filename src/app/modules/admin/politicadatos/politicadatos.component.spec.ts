import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticadatosComponent } from './politicadatos.component';

describe('PoliticadatosComponent', () => {
  let component: PoliticadatosComponent;
  let fixture: ComponentFixture<PoliticadatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticadatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticadatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
