import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YamlSampleDashboardComponent } from './yaml-sample-dashboard.component';

describe('YamlSampleDashboardComponent', () => {
  let component: YamlSampleDashboardComponent;
  let fixture: ComponentFixture<YamlSampleDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YamlSampleDashboardComponent]
    });
    fixture = TestBed.createComponent(YamlSampleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
