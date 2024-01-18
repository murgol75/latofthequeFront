import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminConnectedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  const storedToken: string | null = localStorage.getItem('Token');
  if (!storedToken) {
    router.navigateByUrl('auth/login');
    return false;
  }

  const decodedPayload: string = atob(storedToken.split('.')[1]);
  const parsedPayload: any = JSON.parse(decodedPayload);
  const role = parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  
    if(role == "Admin") {
      return true
    }
    else {
      router.navigateByUrl('auth/login');
      return false;
    }
  };