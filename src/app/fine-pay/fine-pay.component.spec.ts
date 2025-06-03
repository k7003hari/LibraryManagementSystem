import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinePayComponent } from './fine-pay.component';

describe('FinePayComponent', () => {
  let component: FinePayComponent;
  let fixture: ComponentFixture<FinePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinePayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
