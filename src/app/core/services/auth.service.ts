import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, from, of, switchMap, tap, catchError } from "rxjs";
import { AppwriteService } from "./appwrite.service";
import { Models } from 'appwrite';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAdminLoggedInSubject = new BehaviorSubject<boolean>(false);

    constructor(private appwriteService: AppwriteService) {
        try {
            this.checkSession().then(() => {
                console.log('Initial session check complete');
                console.log(this.isAdminLoggedInSubject.value)
            });
        } catch (error) {
            console.error("Initial session check error:", error);
        }
    }

    isAdminLoggedIn(): Observable<boolean> {
        return this.isAdminLoggedInSubject.asObservable();
    }
    
    async adminLogin(email: string, password: string): Promise<boolean> {
        try {
            const session = await this.appwriteService.getAccount().createEmailPasswordSession(email, password);
            this.isAdminLoggedInSubject.next(true);
            console.log("Login successful");
            return true;
        } catch (error) {
            console.error("Login error:", error);
            this.isAdminLoggedInSubject.next(false);
            return false;
        }
    }
      
    async adminLogout(): Promise<void> {
        try {
            await this.appwriteService.getAccount().deleteSession('current');
            this.isAdminLoggedInSubject.next(false);
            console.log("Logged out");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    async checkSession(): Promise<boolean> {
        try {
            const session = await this.appwriteService.getAccount().getSession('current');
            this.isAdminLoggedInSubject.next(true);
            return true;
        } catch (error) {
            this.isAdminLoggedInSubject.next(false);
            return false;
        }
    }
}