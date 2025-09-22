import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainJavascriptSampleDashboardComponent } from './plain-javascript-sample-dashboard.component';

describe('PlainJavascriptSampleDashboardComponent', () => {
  let component: PlainJavascriptSampleDashboardComponent;
  let fixture: ComponentFixture<PlainJavascriptSampleDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlainJavascriptSampleDashboardComponent]
    });
    fixture = TestBed.createComponent(PlainJavascriptSampleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
