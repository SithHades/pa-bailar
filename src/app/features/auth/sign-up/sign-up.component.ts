import { Component } from '@angular/core'
import { MenuComponent } from '../../../shared/components/menu/menu.component'
import { FooterComponent } from '../../../shared/components/footer/footer.component'

@Component({
    selector: 'app-sign-up',
    standalone: true,
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    imports: [MenuComponent, FooterComponent],
})
export class SignUpComponent {}
