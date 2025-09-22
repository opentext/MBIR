import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YamlSampleReportComponent } from './yaml-sample-report.component';

describe('YamlSampleReportComponent', () => {
  let component: YamlSampleReportComponent;
  let fixture: ComponentFixture<YamlSampleReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YamlSampleReportComponent]
    });
    fixture = TestBed.createComponent(YamlSampleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
