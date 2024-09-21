import { Component } from '@angular/core'
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss',
})
export class ConnectComponent {
  constructor(private meta: Meta) {
    this.meta.addTag({
      name: 'title',
      content:
        'Tanzpartnerbörse und Tanzfreunde finden mit Pa’bailar Connect. Tritt passenden Gruppen bei, verabrede dich für Events und tanze Salsa, Bachata und Kizomba in Kiel.',
    })
    this.meta.addTag({
      name: 'description',
      content:
        'Finde Tanzpartner, Gruppen und Tanzpartnerinnen in Kiel. Mit pa‘bailar Connect verpasst du keine Gelegenheit zu Tanzen.',
    })
  }
}
