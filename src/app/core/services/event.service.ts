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
            .eq('accepted', true)
        ).pipe(
            map(({data, error}) => {
                if (error) throw error;
                return data as Event[]
            })
        )
    }

    getEventProposals(): Observable<Event[]> {
        return from(this.supabaseService.getSupabase()
            .from('pabailar_events')
            .select('*')
            .eq('accepted', false)
        ).pipe(
            map(({data, error}) => {
                if (error) throw error;
                return data as Event[]
            })
        )
    }

    addEvent(event: Event): Observable<Event> {
        console.log("Adding Event")
        return from(this.supabaseService.getSupabase()
            .from('pabailar_events')
            .insert({...event, accepted: event.created_by === 'admin'})
            .single()
        ).pipe(
            map(({data, error}) => {
                if (error) throw error;
                return data as Event;
            })
        )
    }

    acceptEventProposal(eventId: number): Observable<Event> {
        return from(this.supabaseService.getSupabase()
            .from('pabailar_events')
            .update({ accepted: true })
            .eq('id', eventId)
            .single()
        ).pipe(
            map(({data, error}) => {
                if (error) throw error;
                return data as Event;
            })
        )
    }

    deleteEvent(eventId: number): Observable<void> {
        return from(this.supabaseService.getSupabase()
            .from('pabailar_events')
            .delete()
            .eq('id', eventId)
        ).pipe(
            map(({error}) => {
                if (error) throw error;
            })
        )
    }

    updateEvent(event: Event): Observable<Event> {
        return from(this.supabaseService.getSupabase()
          .from('pabailar_events')
          .update(event)
          .eq('id', event.id)
          .single()
        ).pipe(
          map(({data, error}) => {
            if (error) throw error;
            return data as Event;
          })
        )
      }
}