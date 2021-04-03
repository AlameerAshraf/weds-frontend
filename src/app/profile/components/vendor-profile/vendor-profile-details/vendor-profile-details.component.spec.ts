import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorProfileDetailsComponent } from './vendor-profile-details.component';

describe('VendorProfileDetailsComponent', () => {
  let component: VendorProfileDetailsComponent;
  let fixture: ComponentFixture<VendorProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
