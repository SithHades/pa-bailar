import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import {
    getAnalytics,
    provideAnalytics,
    ScreenTrackingService,
    UserTrackingService,
} from '@angular/fire/analytics'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { environment } from '../environments/environment'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom(
            provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
        ),
        importProvidersFrom(provideAuth(() => getAuth())),
        importProvidersFrom(provideAnalytics(() => getAnalytics())),
        ScreenTrackingService,
        UserTrackingService,
        importProvidersFrom(provideFirestore(() => getFirestore())),
    ],
}
