import { Component } from '@angular/core'
import { FooterComponent } from '../../../shared/components/footer/footer.component'
import { MenuComponent } from '../../../shared/components/menu/menu.component'

@Component({
    selector: 'app-imprint',
    standalone: true,
    templateUrl: './imprint.component.html',
    styleUrl: './imprint.component.scss',
    imports: [FooterComponent, MenuComponent],
})
export class ImprintComponent {}
