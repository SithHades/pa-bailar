import { Routes } from '@angular/router'
import { ErrorComponent } from './features/error/error.component'
import { HomeComponent } from './features/home/home.component'
import { MaintenanceComponent } from './features/maintenance/maintenance.component'
import { MaintenanceGuard } from './core/guards/maintenance/maintenance.guard'
import { TermOfPrivacyComponent } from './features/terms/term-of-privacy/term-of-privacy.component'
import { TermOfServiceComponent } from './features/terms/term-of-service/term-of-service.component'
import { ImprintComponent } from './features/terms/imprint/imprint.component'
import { EventsComponent } from './features/events/events.component'
import { AdminAuthGuard } from './core/guards/admin-auth/admin-auth.guard'
import { AdminLoginComponent } from './features/admin/login/admin-login.component'
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component'
import { EventManagementComponent } from './features/admin/dashboard/events/management/event-management.component'
import { EventProposalListComponent } from './features/admin/dashboard/events/proposal-list/event-proposal-list.component'
import { ConnectComponent } from './features/connect/connect.component'
import { RoomsComponent } from './features/rooms/rooms.component'
import { WikiComponent } from './features/wiki/wiki.component'
import { CoursesComponent } from './features/courses/courses.component'
import { AnalyticsComponent } from './features/admin/dashboard/analytics/analytics.component'

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
    path: 'connect',
    component: ConnectComponent,
    canActivate: [MaintenanceGuard],
  },
  {
    path: 'rooms',
    component: RoomsComponent,
    canActivate: [MaintenanceGuard],
  },
  {
    path: 'wiki',
    component: WikiComponent,
    canActivate: [MaintenanceGuard],
  },
  {
    path: 'kurse',
    component: MaintenanceComponent,
    canActivate: [MaintenanceGuard],
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: '',
        component: AnalyticsComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'events',
        component: EventManagementComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'proposals',
        component: EventProposalListComponent,
        canActivate: [AdminAuthGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'error',
  },
]
