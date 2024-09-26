import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../core/services/auth.service'
import { Router, RouterModule } from '@angular/router'
import { RouterOutlet } from '@angular/router'
import { CommonModule } from '@angular/common'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [CommonModule, RouterOutlet, RouterModule],
})
export class AdminDashboardComponent implements OnInit {
  safeUrl: SafeResourceUrl | undefined

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const url =
      'https://plausible-us00k8o.kncklab.com/share/pabailar.com?auth=852rVzACMvg5Utx2hPCux&embed=true&theme=light'
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  logout() {
    this.authService.adminLogout()
    this.router.navigate(['/admin/login'])
  }
}
