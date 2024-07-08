import { Routes } from '@angular/router'
import { ErrorComponent } from './features/error/error.component'
import { HomeComponent } from './features/home/home.component'
import { MaintenanceComponent } from './features/maintenance/maintenance.component'
import { MaintenanceGuard } from './core/guards/maintenance/maintenance.guard'
import { TermOfPrivacyComponent } from './features/terms/term-of-privacy/term-of-privacy.component'
import { TermOfServiceComponent } from './features/terms/term-of-service/term-of-service.component'
import { ImprintComponent } from './features/terms/imprint/imprint.component'
import { EventsComponent } from './features/events/events.component'

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [MaintenanceGuard],
        pathMatch: 'full',
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
        path: 'privacy',
        component: TermOfPrivacyComponent,
    },
    {
        path: 'terms',
        component: TermOfServiceComponent,
    },
    {
        path: 'imprint',
        component: ImprintComponent,
    },
    {
        path: 'events',
        component: EventsComponent,
        canActivate: [MaintenanceGuard],
    },
    {
        path: '**',
        redirectTo: 'error',
    },
]
