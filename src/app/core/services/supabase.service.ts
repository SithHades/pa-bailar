import { Injectable } from "@angular/core"
import { createClient, SupabaseClient } from '@supabase/supabase-js'

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        const url = "https://supabase.kncklab.com";
        const key = "SECRET";
        this.supabase = createClient(url!, key!)
    }

    getSupabase() {
        return this.supabase;
    }
}