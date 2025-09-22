import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddingApiSampleComponent } from './embedding-api-sample.component';

describe('EmbeddingApiSampleComponent', () => {
  let component: EmbeddingApiSampleComponent;
  let fixture: ComponentFixture<EmbeddingApiSampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbeddingApiSampleComponent]
    });
    fixture = TestBed.createComponent(EmbeddingApiSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
