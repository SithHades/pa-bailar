import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PabailarEvent } from '../../core/models/event.model'
import { EventService } from '../../core/services/event.service'
import { MenuComponent } from '../../shared/components/menu/menu.component'
import { FooterComponent } from '../../shared/components/footer/footer.component'
import { EventFormComponent } from '../admin/dashboard/events/form/event-form.component'
import { environment } from '../../../environments/environment'
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, MenuComponent, FooterComponent, EventFormComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  events: PabailarEvent[] = []
  expandedEventId: string | null = null
  fullscreenImage: string | null = null

  constructor(private eventService: EventService, private meta: Meta) {
    this.meta.addTag({
      name: 'description',
      content:
        'Finde alle Tanzveranstaltungen und Socials im Bereich Salsa, Bachata und Kizomba (SBK) in Kiel. Mit pa‘bailar nie eine Gelegenheit zu Tanzen verpassen.',
    })
    this.meta.addTag({
      name: 'title',
      content: "Tanzveranstaltungen & Socials in Kiel bei Pa'bailar finden",
    })
    this.meta.addTag({
      name: 'keywords',
      content:
        "Tanzveranstaltungen Kiel, Socials, Salsa, Bachata, Kizomba, SBK, Kiel, pa'bailar",
    })
  }

  ngOnInit() {
    this.loadEvents()
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      (events: PabailarEvent[]) => {
        this.events = events.sort(
          (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
        )
      },
      error => {
        console.error('Error loading events', error)
      }
    )
  }

  onNewEventSubmit(eventData: PabailarEvent) {
    this.eventService.addEvent(eventData).subscribe(newEvent => {
      this.loadEvents()
      // Optionally, add some user feedback here
    })
  }

  toggleEventDetails(eventId: string) {
    this.expandedEventId = this.expandedEventId === eventId ? null : eventId
  }

  isEventExpanded(eventId: string): boolean {
    return this.expandedEventId === eventId
  }

  getTransformedImageUrl(
    originalUrl: string,
    width: number,
    height: number
  ): string {
    if (!originalUrl) return ''

    const fileId = originalUrl.split('/').pop()?.split('?')[0]
    if (!fileId) return originalUrl

    const transformedUrl = `${originalUrl}&width=${width}&height=${height}&gravity=center&quality=100`
    return transformedUrl
  }

  openFullscreenImage(imageUrl: string, event: Event) {
    event.stopPropagation() // Prevent the event from bubbling up to the parent
    this.fullscreenImage = this.getTransformedImageUrl(imageUrl, 1920, 1080) // Use a larger size for fullscreen
  }

  closeFullscreenImage() {
    this.fullscreenImage = null
  }

  getGoogleMapsLink(location: string): string {
    const encodedLocation = encodeURIComponent(location)
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
  }
}
