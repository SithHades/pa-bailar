import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable, from, of, switchMap, tap } from "rxjs"
import { SupabaseService } from "./supabase.service"

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAdminLoggedInSubject = new BehaviorSubject<boolean>(false);

    constructor(private supabaseService: SupabaseService) {
        this.supabaseService.getSupabase().auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event);
            this.isAdminLoggedInSubject.next(!!session);
        });
    }

    isAdminLoggedIn(): Observable<boolean> {
        return from(this.checkSession()).pipe(
          switchMap(() => this.isAdminLoggedInSubject.asObservable()),
          tap(isLoggedIn => console.log('Current login status:', isLoggedIn))
        );
    }
    
    async adminLogin(email: string, password: string): Promise<boolean> {
        const { data, error } = await this.supabaseService.getSupabase().auth.signInWithPassword({email, password});
        const isLoggedIn = !!data.user;
        this.isAdminLoggedInSubject.next(isLoggedIn);
        console.log("Login attempt result:", isLoggedIn);
        return isLoggedIn;
    }
      
    async adminLogout(): Promise<void> {
        await this.supabaseService.getSupabase().auth.signOut();
        this.isAdminLoggedInSubject.next(false);
        console.log("Logged out");
    }

    async checkAuthStatus() {
        const { data: { session } } = await this.supabaseService.getSupabase().auth.getSession();
        this.isAdminLoggedInSubject.next(!!session);
    }

    async checkSession(): Promise<boolean> {
        const { data: { session } } = await this.supabaseService.getSupabase().auth.getSession();
        const isLoggedIn = !!session;
        this.isAdminLoggedInSubject.next(isLoggedIn);
        console.log('Session check result:', isLoggedIn);
        return isLoggedIn;
    }
}