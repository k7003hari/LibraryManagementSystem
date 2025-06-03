import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineCalComponent } from './fine-cal.component';

describe('FineCalComponent', () => {
  let component: FineCalComponent;
  let fixture: ComponentFixture<FineCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FineCalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FineCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
