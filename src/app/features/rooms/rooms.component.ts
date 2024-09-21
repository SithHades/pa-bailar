import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core'
import { Meta } from '@angular/platform-browser'
import { ScriptLoaderService } from '../../core/services/script-loader.service'

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RoomsComponent implements OnInit {
  scriptsLoaded = false

  constructor(private meta: Meta, private scriptLoader: ScriptLoaderService) {
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

  ngOnInit() {
    Promise.all([
      this.scriptLoader.loadScript(
        'https://unpkg.com/vue@3/dist/vue.global.prod.js'
      ),
      this.scriptLoader.loadScript(
        'https://cdn.anny.co/widget/annyComponents.umd.latest.min.js'
      ),
    ])
      .then(() => {
        this.scriptsLoaded = true
      })
      .catch(error => console.error('Error loading scripts', error))
  }
}
