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

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideClientHydration(),
        importProvidersFrom(
            provideFirebaseApp(() =>
                initializeApp({
                    projectId: 'pa-bailar-fca75',
                    appId: '1:366596063328:web:a2229d12d506af5d3e0305',
                    storageBucket: 'pa-bailar-fca75.appspot.com',
                    // locationId: 'europe-west',
                    apiKey: 'AIzaSyDnyeuIYc9CpC39Vu6j3D5KGhEVAbF-oPc',
                    authDomain: 'pa-bailar-fca75.firebaseapp.com',
                    messagingSenderId: '366596063328',
                    measurementId: 'G-4PMBXNC6F1',
                })
            )
        ),
        importProvidersFrom(provideAuth(() => getAuth())),
        importProvidersFrom(provideAnalytics(() => getAnalytics())),
        ScreenTrackingService,
        UserTrackingService,
        importProvidersFrom(provideFirestore(() => getFirestore())),
    ],
}
