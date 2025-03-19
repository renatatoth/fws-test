import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
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
