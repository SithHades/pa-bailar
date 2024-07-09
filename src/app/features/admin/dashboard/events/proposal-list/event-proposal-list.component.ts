import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../../core/models/event.model';
import { EventService } from '../../../../../core/services/event.service'
import { CommonModule, DatePipe } from '@angular/common'

@Component({
  selector: 'app-event-proposal-list',
  standalone: true,
  templateUrl: './event-proposal-list.component.html',
  styleUrls: ['./event-proposal-list.component.scss'],
  imports: [ CommonModule, DatePipe ]
})
export class EventProposalListComponent implements OnInit {
  eventProposals: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEventProposals();
  }

  loadEventProposals() {
    this.eventService.getEventProposals().subscribe(
      proposals => this.eventProposals = proposals,
    );
  }

  acceptProposal(eventId: number) {
    this.eventService.acceptEventProposal(eventId).subscribe(
      () => this.loadEventProposals(),
    );
  }

  rejectProposal(eventId: number) {
    console.log("Rejecting and deleting event")
    this.eventService.deleteEvent(eventId).subscribe(
      () => {
        this.loadEventProposals()
        console.log("Deleted Event")
      },
    );
  }
}