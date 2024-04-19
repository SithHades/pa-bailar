import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuComponent } from '../../shared/components/menu/menu.component'

@Component({
    selector: 'app-error',
    standalone: true,
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss',
    imports: [CommonModule, MenuComponent],
})
export class ErrorComponent {}
