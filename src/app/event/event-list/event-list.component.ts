import { Component, OnInit } from '@angular/core';
import { UserReceived } from 'src/app/shared/models/UserReceived';
import { EventLight } from 'src/app/shared/models/eventLight';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

connectedUser : UserReceived | undefined;
eventList : EventLight[] = [];
isAdminConnected: boolean = false;
isUserConnected: boolean = false;

  constructor(private _eventService : EventService,private _authService : AuthService) {
  }
  
  ngOnInit(): void {
    

    this.loadEvents();
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


  loadEvents() {
    this._eventService.getAll().subscribe({
      next: (events) => {
        this.eventList = events.reverse(); // reverse, comme ça il affiche les derniers évènements encodés en premier
      },
      error: (err) => {
        console.error('Error loading events', err);
      }
    });
  }

  delete(id : number) {
    this._eventService.delete(id).subscribe({
      next:() => {
        this.loadEvents();
      },
      error:(err) => {
        console.error('je n\'ai pu supprimer l\'évènement', err);
      }
    });
  }
  }

