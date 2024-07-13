import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, from, of, switchMap, tap, catchError } from "rxjs";
import { AppwriteService } from "./appwrite.service";
import { Models } from 'appwrite';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAdminLoggedInSubject = new BehaviorSubject<boolean>(false);
    private initialCheckComplete = new BehaviorSubject<boolean>(false);

    constructor(private appwriteService: AppwriteService) {
        this.checkSession();
    }

    isAdminLoggedIn(): Observable<boolean> {
        return this.isAdminLoggedInSubject.asObservable();
    }

    isInitialCheckComplete(): Observable<boolean> {
        return this.initialCheckComplete.asObservable();
    }
    
    async adminLogin(email: string, password: string): Promise<boolean> {
        try {
            // Check if there's an existing session first
            const currentSession = await this.appwriteService.getAccount().getSession('current');
            if (currentSession) {
                console.log("Already logged in");
                this.isAdminLoggedInSubject.next(true);
                return true;
            }
        } catch (error) {
            // No current session, proceed with login
        }

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
            console.log("Session check: Logged in");
            return true;
        } catch (error) {
            this.isAdminLoggedInSubject.next(false);
            console.log("Session check: Not logged in");
            return false;
        } finally {
            this.initialCheckComplete.next(true);
        }
    }
}