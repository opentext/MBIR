import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrosstabDataAnalyzerComponent } from './crosstab-data-analyzer.component';

describe('CrosstabDataAnalyzerComponent', () => {
  let component: CrosstabDataAnalyzerComponent;
  let fixture: ComponentFixture<CrosstabDataAnalyzerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrosstabDataAnalyzerComponent]
    });
    fixture = TestBed.createComponent(CrosstabDataAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
