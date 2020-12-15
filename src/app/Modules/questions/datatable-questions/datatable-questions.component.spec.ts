import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableQuestionsComponent } from './datatable-questions.component';

describe('DatatableQuestionsComponent', () => {
  let component: DatatableQuestionsComponent;
  let fixture: ComponentFixture<DatatableQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
