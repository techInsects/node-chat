import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentBoardComponent } from './agent-board.component';

describe('AgentBoardComponent', () => {
  let component: AgentBoardComponent;
  let fixture: ComponentFixture<AgentBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
