import { Component, OnInit } from '@angular/core'
import { RoomService } from '../../../shared/services/room/room.service'
import { Observable, of } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { RoomPreviewComponent } from '../../../shared/components/room-preview/room-preview.component'
import { Room } from '../../../shared/models/room'

@Component({
    selector: 'app-room-list',
    standalone: true,
    templateUrl: './room-list.component.html',
    styleUrl: './room-list.component.scss',
    imports: [AsyncPipe, RoomPreviewComponent],
})
export class RoomListComponent implements OnInit {
    rooms: Observable<Room[]> = of([])

    constructor(private roomService: RoomService) {}

    ngOnInit() {
        this.rooms = this.roomService.getRooms()
    }
}
