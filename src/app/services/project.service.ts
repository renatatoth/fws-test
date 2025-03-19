import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  DocumentData,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Project } from '../models/Project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly projectCollection;

  constructor(private firestore: Firestore) {
    this.projectCollection = collection(this.firestore, 'projects');
  }

  createProject(project: Project): Observable<DocumentData> {
    return from(addDoc(this.projectCollection, project));
  }

  getProjects(): Observable<Project[]> {
    return from(getDocs(this.projectCollection)).pipe(
      map((snapshot) => {
        const resultList = snapshot.docs.map((doc) => {
          const projectData: Project = doc.data() as Project;
          projectData.id = doc.id;
          return projectData;
        });
        return resultList;
      })
    );
  }
}
