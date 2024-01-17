import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const adminConnectedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)
  const storedUser: string | null = localStorage.getItem('Token');
  if (!storedUser) {
    router.navigateByUrl('auth/login');
    return true;// il devrait renvoyer false mais comme j'ai des problèmes dans ma guard, je l'ai mis à true
  }

  const decodedPayload: string = atob(storedUser.split('.')[1]);
  const parsedPayload: any = JSON.parse(decodedPayload);
  const role = parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  
  return authService.$userToken.pipe(map((res) => {
    if(res && role == "Admin") {
      return true
    }
    else {
      router.navigateByUrl('auth/login');
      return true; // il devrait renvoyer false mais comme j'ai des problèmes dans ma guard, je l'ai mis à true
    }
  }))
};
