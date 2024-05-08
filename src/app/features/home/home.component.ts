import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuComponent } from '../../shared/components/menu/menu.component'
import { FooterComponent } from '../../shared/components/footer/footer.component'

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, MenuComponent, FooterComponent],
})
export class HomeComponent {}
