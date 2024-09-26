import { Component } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent {
  safeUrl: SafeResourceUrl | undefined

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const url =
      'https://plausible-us00k8o.kncklab.com/share/pabailar.com?auth=852rVzACMvg5Utx2hPCux&embed=true&theme=light'
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}

