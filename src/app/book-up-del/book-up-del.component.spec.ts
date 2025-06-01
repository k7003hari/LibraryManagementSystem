import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUpDelComponent } from './book-up-del.component';

describe('BookUpDelComponent', () => {
  let component: BookUpDelComponent;
  let fixture: ComponentFixture<BookUpDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookUpDelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookUpDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
