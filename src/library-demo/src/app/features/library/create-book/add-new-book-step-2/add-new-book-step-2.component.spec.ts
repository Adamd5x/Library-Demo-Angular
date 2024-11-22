import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBookStep2Component } from './add-new-book-step-2.component';

describe('AddNewBookStep2Component', () => {
  let component: AddNewBookStep2Component;
  let fixture: ComponentFixture<AddNewBookStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewBookStep2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBookStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
