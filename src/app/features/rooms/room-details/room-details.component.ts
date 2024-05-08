import { Component, Input, OnInit } from '@angular/core'
import { AvailabilityRule, Room } from '../../../shared/models/room'
import { ActivatedRoute } from '@angular/router'
import { RoomService } from '../../../shared/services/room/room.service'

interface AvailabilityTimeslot {
    dayOfWeek: string
    timeRange: string
}

@Component({
    selector: 'app-room-details',

    standalone: true,

    imports: [],

    templateUrl: './room-details.component.html',

    styleUrl: './room-details.component.scss',
})
export class RoomDetailsComponent implements OnInit {
    @Input() room!: Room
    roomId!: string

    daysOfWeek: string[] = [
        'Sonntag',
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
    ]

    constructor(
        private route: ActivatedRoute,
        private roomService: RoomService
    ) {}

    ngOnInit() {
        if (!this.room) {
            this.route.params.subscribe(params => {
                this.roomId = params['id']
                this.getRoom(this.roomId)
            })
        }
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth' })
    }

    getRoom(id: string) {
        this.roomService.getRoom(id).subscribe((room: Room) => {
            this.room = room
        })
    }

    formatAvailabilityTimeslots(
        availabilityRules: AvailabilityRule[]
    ): AvailabilityTimeslot[][] {
        // Initialize an array to hold availability timeslots for each day of the week
        const timeslotsByDay: AvailabilityTimeslot[][] = this.daysOfWeek.map(
            () => []
        )

        availabilityRules.forEach(rule => {
            if (rule.available) {
                const dayOfWeekString = this.daysOfWeek[rule.dayOfWeek]
                const timeRange = `${rule.startTime} - ${rule.endTime}`
                timeslotsByDay[rule.dayOfWeek].push({
                    dayOfWeek: dayOfWeekString,
                    timeRange: timeRange,
                })
            }
        })

        return timeslotsByDay
    }
}
