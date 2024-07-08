import { Injectable } from "@angular/core"
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor() {
        const url = environment.supabase.url;
        const key = environment.supabase.public_key;
        this.supabase = createClient(url!, key!)
    }

    getSupabase() {
        return this.supabase;
    }
}