import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainJavascriptSampleReportComponent } from './plain-javascript-sample-report.component';

describe('PlainJavascriptSampleReportComponent', () => {
  let component: PlainJavascriptSampleReportComponent;
  let fixture: ComponentFixture<PlainJavascriptSampleReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlainJavascriptSampleReportComponent]
    });
    fixture = TestBed.createComponent(PlainJavascriptSampleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
