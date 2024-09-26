import { Injectable } from '@angular/core'
import { AppwriteService } from './appwrite.service'
import { Observable, from, map } from 'rxjs'
import { PabailarEvent } from '../models/event.model'
import { Query } from 'appwrite'

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private collectionId = '66d9fe30003461f9ec1b' // Replace with your Appwrite collection ID
  private databaseId = '66d9fe280027416f1bf0' // Replace with your Appwrite database ID

  constructor(private appwriteService: AppwriteService) {}

  getEvents(): Observable<PabailarEvent[]> {
    return from(
      this.appwriteService
        .getDatabase()
        .listDocuments(this.databaseId, this.collectionId, [
          Query.equal('accepted', true),
        ])
    )
      .pipe(map(response => response.documents as unknown as PabailarEvent[]))
      .pipe(
        map(events => {
          const now = new Date()
          return events.filter(event => new Date(event.start) > now)
        })
      )
  }

  getEventProposals(): Observable<PabailarEvent[]> {
    return from(
      this.appwriteService
        .getDatabase()
        .listDocuments(this.databaseId, this.collectionId, [
          Query.equal('accepted', false),
        ])
    ).pipe(map(response => response.documents as unknown as PabailarEvent[]))
  }

  addEvent(event: PabailarEvent): Observable<PabailarEvent> {
    console.log('Adding Event')
    return from(
      this.appwriteService
        .getDatabase()
        .createDocument(this.databaseId, this.collectionId, 'unique()', {
          ...event,
          accepted: event.createdBy === 'admin' || event.createdBy === 'Admin',
        })
    ).pipe(map(response => response as unknown as PabailarEvent))
  }

  acceptEventProposal(eventId: string): Observable<PabailarEvent> {
    return from(
      this.appwriteService
        .getDatabase()
        .updateDocument(this.databaseId, this.collectionId, eventId, {
          accepted: true,
        })
    ).pipe(map(response => response as unknown as PabailarEvent))
  }

  deleteEvent(eventId: string): Observable<void> {
    return from(
      this.appwriteService
        .getDatabase()
        .deleteDocument(this.databaseId, this.collectionId, eventId)
    ).pipe(map(() => undefined))
  }

  updateEvent(event: PabailarEvent): Observable<PabailarEvent> {
    return from(
      this.appwriteService
        .getDatabase()
        .updateDocument(this.databaseId, this.collectionId, event.$id!, event)
    ).pipe(map(response => response as unknown as PabailarEvent))
  }
}
