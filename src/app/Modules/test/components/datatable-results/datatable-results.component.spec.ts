import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableResultsComponent } from './datatable-results.component';

describe('DatatableResultsComponent', () => {
  let component: DatatableResultsComponent;
  let fixture: ComponentFixture<DatatableResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
