import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMissingComponent } from './session-missing.component';

describe('SessionMissingComponent', () => {
  let component: SessionMissingComponent;
  let fixture: ComponentFixture<SessionMissingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionMissingComponent]
    });
    fixture = TestBed.createComponent(SessionMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
