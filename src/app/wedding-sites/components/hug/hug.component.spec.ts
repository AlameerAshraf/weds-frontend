import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HugComponent } from './hug.component';

describe('HugComponent', () => {
  let component: HugComponent;
  let fixture: ComponentFixture<HugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
