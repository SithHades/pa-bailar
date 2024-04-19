import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuComponent } from '../../shared/components/menu/menu.component'

@Component({
    selector: 'app-maintenance',
    standalone: true,
    templateUrl: './maintenance.component.html',
    styleUrl: './maintenance.component.scss',
    imports: [CommonModule, MenuComponent],
})
export class MaintenanceComponent {}
