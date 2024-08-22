import { Component } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Component({
    selector: 'app-wiki',
    standalone: true,
    imports: [],
    templateUrl: './wiki.component.html',
    styleUrl: './wiki.component.scss',
})
export class WikiComponent {
    constructor(private meta: Meta) {
        this.meta.addTag({
            name: 'description',
            content:
                "Entdecke das Tanz-Wiki von Pa'bailar – hier findest du Erklärungen zu verschiedenen Tanzstilen, die besten Locations in Kiel und vieles mehr aus der SBK Szene.",
        })
        this.meta.addTag({
            name: 'title',
            content: 'Tanzen in Kiel– Alles über Salsa, Bachata & Kizomba',
        })
        this.meta.addTag({
            name: 'keywords',
            content:
                'Tanzstile, Salsa, Bachata, Kizomba, Kiel, Tanzschule, Tanzkurs, Tanzpartner, Tanzlehrer, Tanzworkshop, Tanzveranstaltung, Tanzszene',
        })
    }
}

