import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingWebsiteComponent } from './wedding-website.component';

describe('WeddingWebsiteComponent', () => {
  let component: WeddingWebsiteComponent;
  let fixture: ComponentFixture<WeddingWebsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeddingWebsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
