import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuComponent } from '../../shared/components/menu/menu.component'
import { FooterComponent } from '../../shared/components/footer/footer.component'
import { Meta } from '@angular/platform-browser'

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, MenuComponent, FooterComponent],
})
export class HomeComponent {
    constructor(private meta: Meta) {
        this.meta.addTag({
            name: 'title',
            content:
                "Pa'bailar Kiel –Tanzplattform für Salsa/ Bachata/ Kizomba",
        })
        this.meta.addTag({
            name: 'description',
            content:
                "Tanzen mit pa'bailar – Die Plattform für Salsa, Bachata und Kizomba (SBK) in Kiel. Finde Tanzschulen, Events & Tanzkurse. Verbinde dich mit anderen Tänzern.",
        })
        this.meta.addTag({
            name: 'keywords',
            content:
                "Tanzveranstaltungen Kiel, Socials, Salsa, Bachata, Kizomba, SBK, Kiel, pa'bailar",
        })
    }
}
