import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import deLocale from '@fullcalendar/core/locales/de';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
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
  @ViewChild('eventPopup') eventPopup!: ElementRef;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    locales: [deLocale],
    locale: deLocale,
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: 'short' }
      }
    }
  };

  selectedDate: Date | null = null;
  selectedDateEvents: Event[] = [];
  selectedEvent: Event | null = null;

  constructor(private eventService: EventService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.adjustCalendarView();
  }

  adjustCalendarView() {
    if (window.innerWidth < 768) {
      this.calendarOptions.headerToolbar = {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek, timeGridDay'
      };
      this.calendarOptions.views = {
        dayGridMonth: {
          titleFormat: { year: 'numeric', month: 'short' },
          dayHeaderFormat: { weekday: 'narrow' }
        }
      };
    } else {
      this.calendarOptions.headerToolbar = {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      };
      this.calendarOptions.views = {
        dayGridMonth: {
          titleFormat: { year: 'numeric', month: 'long' }
        }
      };
    }
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      (events: Event[]) => {
        this.calendarOptions.events = events.map(event => ({
          id: event.id?.toString(),
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

  handleDateClick(arg: DateClickArg) {
    this.selectedDate = arg.date;
    this.selectedDateEvents = (this.calendarOptions.events as Event[]).filter(
      event => new Date(event.start).toDateString() === this.selectedDate?.toDateString()
    );
  }

  handleEventClick(arg: EventClickArg) {
    this.selectedEvent = {
      id: Number(arg.event.id),
      title: arg.event.title,
      start: arg.event.start as Date,
      end: arg.event.end as Date,
      description: arg.event.extendedProps['description']
    };
    this.showEventPopup();
  }

  showEventPopup() {
    (this.eventPopup.nativeElement as HTMLElement).classList.remove('hidden');
  }

  closeEventPopup() {
    (this.eventPopup.nativeElement as HTMLElement).classList.add('hidden');
    this.selectedEvent = null;
  }
}