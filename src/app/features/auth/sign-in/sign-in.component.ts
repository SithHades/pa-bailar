import { Component } from '@angular/core'
import { MenuComponent } from '../../../shared/components/menu/menu.component'
import { AuthService } from '../../../shared/services/auth/auth.service'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-sign-in',
    standalone: true,
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss',
    imports: [MenuComponent, FormsModule],
})
export class SignInComponent {
    email: string = ''
    password: string = ''
    rememberMe: boolean = false

    constructor(private authService: AuthService, private router: Router) {}

    signIn() {
        if (this.email && this.password) {
            this.authService
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.router.navigate(['/'])
                })
        }
    }
}
