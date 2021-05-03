import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRingComponent } from './single-ring.component';

describe('SingleRingComponent', () => {
  let component: SingleRingComponent;
  let fixture: ComponentFixture<SingleRingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleRingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
