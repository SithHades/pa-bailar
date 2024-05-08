import { Component, Input } from '@angular/core'
import { Room } from '../../models/room'

@Component({
    selector: 'app-room-preview',
    standalone: true,
    imports: [],
    templateUrl: './room-preview.component.html',
    styleUrl: './room-preview.component.scss',
})
export class RoomPreviewComponent {
    @Input() room!: Room
}
