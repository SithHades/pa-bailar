import { Component } from '@angular/core'
import { MenuComponent } from '../../../shared/components/menu/menu.component'
import { FooterComponent } from '../../../shared/components/footer/footer.component'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../../shared/services/auth/auth.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-sign-up',
    standalone: true,
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
    imports: [MenuComponent, FooterComponent, FormsModule],
})
export class SignUpComponent {
    email: string = ''
    password: string = ''
    confirmPassword: string = ''
    acceptTerms: boolean = false

    constructor(private authService: AuthService, private router: Router) {}

    signUp() {
        if (
            this.email &&
            this.password &&
            this.password === this.confirmPassword &&
            this.acceptTerms
        ) {
            this.authService
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.router.navigate(['/'])
                })
        }
    }
}
