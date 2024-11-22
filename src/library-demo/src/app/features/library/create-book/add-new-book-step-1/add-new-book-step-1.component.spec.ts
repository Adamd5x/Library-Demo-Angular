import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBookStep1Component } from './add-new-book-step-1.component';

describe('AddNewBookStep1Component', () => {
  let component: AddNewBookStep1Component;
  let fixture: ComponentFixture<AddNewBookStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewBookStep1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBookStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
