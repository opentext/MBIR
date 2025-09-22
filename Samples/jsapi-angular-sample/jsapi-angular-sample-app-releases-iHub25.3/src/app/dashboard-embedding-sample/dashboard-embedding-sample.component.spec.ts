import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmbeddingSampleComponent } from './dashboard-embedding-sample.component';

describe('DashboardEmbeddingSampleComponent', () => {
  let component: DashboardEmbeddingSampleComponent;
  let fixture: ComponentFixture<DashboardEmbeddingSampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEmbeddingSampleComponent]
    });
    fixture = TestBed.createComponent(DashboardEmbeddingSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
