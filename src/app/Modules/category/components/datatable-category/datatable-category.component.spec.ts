import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableCategoryComponent } from './datatable-category.component';

describe('DatatableCategoryComponent', () => {
  let component: DatatableCategoryComponent;
  let fixture: ComponentFixture<DatatableCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
