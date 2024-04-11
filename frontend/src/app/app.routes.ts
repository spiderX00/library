import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailsComponent } from './pages/details/details.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'details/:bookId',
        component: DetailsComponent
    },
    { 
        path: '**', 
        redirectTo: 'home', 
        pathMatch: 'full' 
    }
];
