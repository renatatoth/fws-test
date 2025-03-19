import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRegComponent } from './project-reg.component';

describe('ProjectRegComponent', () => {
  let component: ProjectRegComponent;
  let fixture: ComponentFixture<ProjectRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
