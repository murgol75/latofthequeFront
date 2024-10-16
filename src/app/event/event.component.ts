import { Component } from '@angular/core';
import { UserReceived } from '../shared/models/UserReceived';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  isAdminConnected: boolean = false;
  isUserConnected: boolean = false;
  connectedUser : UserReceived | undefined;
  constructor(private _authService : AuthService) {

  }

  ngOnInit(): void {
    const storedUser: string | null = localStorage.getItem('Token');

    if (storedUser) {
        const decodedPayload: string = atob(storedUser.split('.')[1]);
        const parsedPayload: any = JSON.parse(decodedPayload);

        const nom = parsedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const role = parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role === 'Admin') {
            this.isAdminConnected = true;
            this.isUserConnected = true;
        }
        else if (role === 'User') {
            this.isAdminConnected = false;
            this.isUserConnected = true;
        }
        else {
            this.isAdminConnected = false;
            this.isUserConnected = false;
        }
    }
}
}
