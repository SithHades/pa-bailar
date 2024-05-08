import { inject, Injectable } from '@angular/core'
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithCredential,
    signInWithEmailAndPassword,
    User,
} from '@angular/fire/auth'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private auth: Auth = inject(Auth)

    user: User | undefined

    constructor() {}

    async createUserWithEmailAndPassword(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password)
            .then(userCredential => {
                this.user = userCredential.user
            })
            .catch(error => {
                const errorCode = error.code
                console.log(errorCode)
            })
    }

    async signInWithEmailAndPassword(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password)
            .then(userCredential => {
                this.user = userCredential.user
            })
            .catch(error => {
                const errorCode = error.code
                console.log(errorCode)
            })
    }

    async signOut() {
        signInWithCredential
        return this.auth.signOut()
    }
}
