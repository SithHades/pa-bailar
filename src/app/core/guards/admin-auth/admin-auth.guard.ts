import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"
import { map, tap } from "rxjs"

export const AdminAuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    return authService.isAdminLoggedIn().pipe(
      tap(loggedIn => console.log('AdminAuthGuard check:', loggedIn)),
      map(loggedIn => {
        if (!loggedIn) {
          console.log("Not logged in. Redirecting to login.");
          router.navigate(['/admin/login']);
          return false;
        }
        console.log("Logged in. Allowing access.");
        return true;
      })
    );
  };