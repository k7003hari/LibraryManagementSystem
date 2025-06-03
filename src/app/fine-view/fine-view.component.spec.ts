import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinesViewComponent } from './fine-view.component';

describe('FineViewComponent', () => {
  let component: FinesViewComponent;
  let fixture: ComponentFixture<FinesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
