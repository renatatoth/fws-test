import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectRegComponent } from './components/project-reg/project-reg.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/project-list', pathMatch: 'full' },
  { path: 'project-list', component: ProjectListComponent },
  { path: 'project-list/edit/:projectId', component: ProjectRegComponent },
  { path: 'project-reg', component: ProjectRegComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
