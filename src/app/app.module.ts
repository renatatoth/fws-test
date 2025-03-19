import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectRegComponent } from './components/project-reg/project-reg.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectRegComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCrtvPhXl-EQoBFUKTSW95TN8VGPWLUeFs',
        authDomain: 'fws-test-deecb.firebaseapp.com',
        projectId: 'fws-test-deecb',
        storageBucket: 'fws-test-deecb.firebasestorage.app',
        messagingSenderId: '917647456665',
        appId: '1:917647456665:web:63720c2729967c65d07b08',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
