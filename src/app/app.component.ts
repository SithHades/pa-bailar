import { Component } from '@angular/core'
import { CommonModule , registerLocaleData} from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { FooterComponent } from './shared/components/footer/footer.component'
import { MenuComponent } from './shared/components/menu/menu.component'
import { HttpClientModule } from '@angular/common/http'
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { AuthService } from './core/services/auth.service'

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        CommonModule,
        RouterOutlet,
        HttpClientModule,
        FooterComponent,
        MenuComponent,
    ],
})
export class AppComponent {
    constructor(private authService: AuthService) {
        registerLocaleData(localeDe, 'de-DE', localeDeExtra)
    }

    ngOnInit() {
        // this.authService.checkSession().then(() => {
        //     console.log('Initial session check complete');
        // });
    }
}
