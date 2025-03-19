import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Project } from '../../models/Project.model';
import { Status } from '../../models/Status.model';

@Component({
  selector: 'app-project-reg',
  standalone: false,
  templateUrl: './project-reg.component.html',
  styleUrl: './project-reg.component.css',
})
export class ProjectRegComponent implements OnInit, OnDestroy {
  projectForm!: FormGroup;
  subSaveProject?: Subscription;
  Status = Status;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.subSaveProject?.unsubscribe();
  }

  createProject(): void {
    console.log(this.projectForm.value);

    if (this.projectForm.valid) {
      const project: Project = this.projectForm.value;
      this.subSaveProject = this.projectService
        .createProject(project)
        .subscribe({
          next: () => {
            console.log('Project created');
          },
          error: (err) => {
            console.log(err);
          },
        });
      this.projectForm.reset();
    }
  }

  get name(): AbstractControl | null {
    return this.projectForm.get('name');
  }

  get description(): AbstractControl | null {
    return this.projectForm.get('description');
  }

  get status(): AbstractControl | null {
    return this.projectForm.get('status');
  }
}
