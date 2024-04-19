import { Component } from '@angular/core'
import { MenuComponent } from '../../../shared/components/menu/menu.component'

@Component({
    selector: 'app-sign-in',
    standalone: true,
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
    imports: [MenuComponent],
})
export class SignInComponent {}
