import { Component } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Component({
    selector: 'app-rooms',
    standalone: true,
    imports: [],
    templateUrl: './rooms.component.html',
    styleUrl: './rooms.component.scss',
})
export class RoomsComponent {
    constructor(private meta: Meta) {
        this.meta.addTag({
            name: 'description',
            content:
                'Finde und buche über pa’bailar Tanzräume in Kiel. Perfekt für Selbstlerner und Tanzgruppen. Flexibel Räume reservieren und Tanzleidenschaft ausleben.',
        })
        this.meta.addTag({
            name: 'title',
            content: "Tanzräume für Selbstlerner in Kiel finden– Pa'bailar",
        })
        this.meta.addTag({
            name: 'keywords',
            content:
                'Tanzraum, Tanzraum mieten, Tanzraum Kiel, Tanzraum reservieren, Tanzraum buchen, Tanzraum für Selbstlerner, Tanzraum für Tanzgruppen',
        })
    }
}

