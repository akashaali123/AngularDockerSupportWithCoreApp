import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelTemplateComponent } from './admin-panel-template.component';

describe('AdminPanelTemplateComponent', () => {
  let component: AdminPanelTemplateComponent;
  let fixture: ComponentFixture<AdminPanelTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
