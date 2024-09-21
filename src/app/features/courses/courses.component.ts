import { Component } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: 'description',
      content:
        "Entdecke SBK Tanzkurse in Kiel. Bei Pa'Bailar findest du Salsa, Bachata und Kizomba Kurse, von Anfänger über Mittelstufe bis Fortgeschritten-Level.",
    })
    this.meta.addTag({
      name: 'title',
      content: "Salsa, Bachata, Kizomba Tanzkurse Kiel finden - Pa'bailar",
    })
    this.meta.addTag({
      name: 'keywords',
      content:
        'Tanzschule Kiel, Bachata tanzen Kiel, Kizomba tanzen Kiel, Salsa tanzen Kiel',
    })
  }
}
