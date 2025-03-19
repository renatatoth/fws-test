import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../services/project.service';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Project } from '../../models/Project.model';
import { Status } from '../../models/Status.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-reg',
  standalone: false,
  templateUrl: './project-reg.component.html',
  styleUrl: './project-reg.component.css',
})
export class ProjectRegComponent implements OnInit, OnDestroy {
  projectForm!: FormGroup;
  subSaveProject?: Subscription;
  subRoute?: Subscription;
  Status = Status;
  projectId: string | null = null;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subRoute = this.activatedRoute.params.subscribe((params) => {
      this.projectId = params['projectId'];
      if (this.projectId) {
        this.loadProject(this.projectId);
      }
    });

    this.projectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      contacts: new FormArray([this.createContactGroup()], Validators.required),
    });
  }

  ngOnDestroy(): void {
    this.subSaveProject?.unsubscribe();
    this.subRoute?.unsubscribe();
  }

  submitForm(): void {
    if (this.projectForm.valid) {
      const project: Project = this.projectForm.value;

      if (this.projectId) {
        project.id = this.projectId;
        this.subSaveProject = this.projectService
          .updateProject(project)
          .subscribe({
            next: () => {
              console.log('Project updated');
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
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
    this.router.navigate(['project-list']);
  }

  loadProject(projectId: string): void {
    this.projectService.getProject(projectId).subscribe({
      next: (project: Project) => {
        this.projectForm.patchValue(project);
        if (project.contacts) {
          this.projectForm.setControl(
            'contacts',
            new FormArray(
              project.contacts.map((contact) =>
                this.createContactGroup(
                  contact.contactName,
                  contact.contactEmail
                )
              )
            )
          );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createContactGroup(
    contactName: string = '',
    contactEmail: string = ''
  ): FormGroup {
    return new FormGroup({
      contactName: new FormControl(contactName, Validators.required),
      contactEmail: new FormControl(contactEmail, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  addContact(): void {
    (this.projectForm.get('contacts') as FormArray).push(
      this.createContactGroup()
    );
  }

  removeContact(index: number): void {
    (this.projectForm.get('contacts') as FormArray).removeAt(index);
  }

  onReturn(): void {
    this.router.navigate(['project-list']);
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

  get contacts(): FormArray {
    return this.projectForm.get('contacts') as FormArray;
  }
}
