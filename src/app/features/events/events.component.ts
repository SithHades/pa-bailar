import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from '../../core/models/event.model'
import { EventService } from '../../core/services/event.service';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, MenuComponent, FooterComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        this.calendarOptions.events = events.map(event => ({
          title: event.title,
          start: event.start,
          end: event.end,
          extendedProps: {
            description: event.description
          }
        }));
      },
      error => {
        console.error('Error loading events', error);
      }
    );
  }

  handleDateClick(arg: any) {
    // Implement date click functionality (e.g., open a modal to add a new event)
    console.log('Date click', arg.date);
  }

  handleEventClick(arg: any) {
    // Implement event click functionality (e.g., open a modal to show event details)
    console.log('Event click', arg.event);
  }
}