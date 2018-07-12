import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursCreerComponent } from './cours-creer.component';

describe('CoursCreerComponent', () => {
  let component: CoursCreerComponent;
  let fixture: ComponentFixture<CoursCreerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursCreerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
