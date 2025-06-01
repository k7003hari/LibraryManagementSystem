import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberUpDelComponent } from './member-up-del.component';

describe('MemberUpDelComponent', () => {
  let component: MemberUpDelComponent;
  let fixture: ComponentFixture<MemberUpDelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberUpDelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberUpDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
