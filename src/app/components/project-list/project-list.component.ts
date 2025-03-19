import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../models/Project.model';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects$?: Observable<Project[]>;
  subDelete?: Subscription;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.projects$ = this.projectService.getProjects();
  }

  onUpdateProject(id?: string) {
    if (id) {
      this.router.navigate(['project-list', 'edit', id]);
    }
  }

  onDeleteProject(id?: string) {
    if (id && confirm('Valóban szeretné törölni a kiválasztott projektet?')) {
      this.subDelete = this.projectService.deleteProject(id).subscribe({
        complete: () => {
          location.reload();
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subDelete?.unsubscribe();
  }
}
