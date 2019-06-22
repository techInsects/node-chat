import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProjComponent } from './assign-proj.component';

describe('AssignProjComponent', () => {
  let component: AssignProjComponent;
  let fixture: ComponentFixture<AssignProjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignProjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
