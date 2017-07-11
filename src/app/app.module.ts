import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from './routes';

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { IndividualComponent } from './individual/individual.component';
import { AuthGuard } from './auth.guard'

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    IndividualComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }