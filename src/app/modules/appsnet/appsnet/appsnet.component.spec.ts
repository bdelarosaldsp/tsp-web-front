import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsnetComponent } from './appsnet.component';

describe('AppsnetComponent', () => {
  let component: AppsnetComponent;
  let fixture: ComponentFixture<AppsnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppsnetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
