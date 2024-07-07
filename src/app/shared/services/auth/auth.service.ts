import { inject, Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor() {}

    async createUserWithEmailAndPassword(email: string, password: string) {}

    async signInWithEmailAndPassword(email: string, password: string) {}

    async signOut() {}
}
