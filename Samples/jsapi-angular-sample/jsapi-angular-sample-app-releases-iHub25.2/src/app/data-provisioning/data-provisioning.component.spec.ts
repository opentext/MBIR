import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProvisioningComponent } from './data-provisioning.component';

describe('DataProvisioningComponent', () => {
  let component: DataProvisioningComponent;
  let fixture: ComponentFixture<DataProvisioningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataProvisioningComponent]
    });
    fixture = TestBed.createComponent(DataProvisioningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
