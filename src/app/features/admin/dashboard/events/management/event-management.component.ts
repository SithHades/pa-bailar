import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../core/services/event.service'
import { PabailarEvent } from '../../../../../core/models/event.model';
import { CommonModule } from '@angular/common'
import { EventFormComponent } from "../form/event-form.component";

@Component({
  selector: 'app-event-management',
  standalone: true,
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss'],
  imports: [CommonModule, EventFormComponent]
})
export class EventManagementComponent implements OnInit {
  events: PabailarEvent[] = [];
  selectedEvent: PabailarEvent | null = null;
  isCreating = false;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      events => this.events = events    
    );
  }

  createEvent() {
    this.isCreating = true;
    this.selectedEvent = null;
  }

  editEvent(event: PabailarEvent) {
    this.isCreating = false;
    this.selectedEvent = { ...event };
  }

  deleteEvent(eventId: string | number) {
    this.eventService.deleteEvent(eventId.toString()).subscribe(
      () => this.loadEvents()
    );
  }

  onFormSubmit(eventData: PabailarEvent) {
    if (this.isCreating) {
      this.eventService.addEvent(eventData).subscribe(
        () => {
          this.loadEvents();
          this.isCreating = false;
        }
      );
    } else {
      this.eventService.updateEvent(eventData).subscribe(
        () => {
          this.loadEvents();
          this.selectedEvent = null;
        }
      );
    }
  }

  cancelForm() {
    this.isCreating = false;
    this.selectedEvent = null;
  }
}