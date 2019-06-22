import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjDetailComponent } from './edit-proj-detail.component';

describe('EditProjDetailComponent', () => {
  let component: EditProjDetailComponent;
  let fixture: ComponentFixture<EditProjDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
