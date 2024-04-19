import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuComponent } from '../../../shared/components/menu/menu.component'

@Component({
    selector: 'app-term-of-service',
    standalone: true,
    templateUrl: './term-of-service.component.html',
    styleUrl: './term-of-service.component.scss',
    imports: [CommonModule, MenuComponent],
})
export class TermOfServiceComponent {}
