import { Routes } from '@angular/router';

import { ChatComponent } from './chat/chat.component';
import { IndividualComponent } from './individual/individual.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const ROUTES: Routes = [
    { path: '', component: ChatComponent, canActivate: [ AuthGuard ] },
    { path: 'profile/:id', component: IndividualComponent, canActivate: [ AuthGuard ] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '/404' }
];