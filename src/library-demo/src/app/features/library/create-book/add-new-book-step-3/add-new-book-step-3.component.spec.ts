import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBookStep3Component } from './add-new-book-step-3.component';

describe('AddNewBookStep3Component', () => {
  let component: AddNewBookStep3Component;
  let fixture: ComponentFixture<AddNewBookStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewBookStep3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBookStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
