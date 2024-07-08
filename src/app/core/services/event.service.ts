import { Injectable } from "@angular/core"
import { SupabaseService } from "./supabase.service"
import { Observable, from, map } from "rxjs"
import { Event } from '../models/event.model'

@Injectable({
    providedIn: 'root'
})
export class EventService {
    constructor(private supabaseService: SupabaseService) {}

    getEvents(): Observable<Event[]> {
        return from(this.supabaseService.getSupabase()
            .from('pabailar_events')
            .select('*')
        ).pipe(
            map(({data, error}) => {
                if (error) throw error;
                return data as Event[]
            })
        )
    }

    addEvent(event: Event): Observable<Event> {
        return from(this.supabaseService.getSupabase()
            .from('pabailar_events')
            .insert(event)
            .single()
        ).pipe(
            map(({data, error}) => {
                if (error) throw error;
                return data as Event;
            })
        )
    }
}