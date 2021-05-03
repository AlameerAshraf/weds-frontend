import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDressComponent } from './single-dress.component';

describe('SingleDressComponent', () => {
  let component: SingleDressComponent;
  let fixture: ComponentFixture<SingleDressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
