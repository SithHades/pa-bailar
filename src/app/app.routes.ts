import { Routes } from '@angular/router'
import { ErrorComponent } from './features/error/error.component'
import { HomeComponent } from './features/home/home.component'
import { MaintenanceComponent } from './features/maintenance/maintenance.component'
import { MaintenanceGuard } from './core/guards/maintenance/maintenance.guard'
import { SignInComponent } from './features/auth/sign-in/sign-in.component'
import { SignUpComponent } from './features/auth/sign-up/sign-up.component'
import { DashboardComponent as UserDashboardComponent } from './features/user/dashboard/dashboard.component'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [MaintenanceGuard],
    },
    {
        path: 'maintenance',
        component: MaintenanceComponent,
    },
    {
        path: 'error',
        component: ErrorComponent,
        canActivate: [MaintenanceGuard],
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [MaintenanceGuard],
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        canActivate: [MaintenanceGuard],
    },
    {
        path: 'user/dashboard',
        component: UserDashboardComponent,
        canActivate: [MaintenanceGuard],
    },
    {
        path: '**',
        redirectTo: 'error',
    },
]
