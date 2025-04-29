import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDesignerComponent } from './dashboard-designer.component';

describe('DashboardDesignerComponent', () => {
  let component: DashboardDesignerComponent;
  let fixture: ComponentFixture<DashboardDesignerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDesignerComponent]
    });
    fixture = TestBed.createComponent(DashboardDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
