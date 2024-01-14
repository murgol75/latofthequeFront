import { Component, OnInit } from '@angular/core';
import { EventLight } from 'src/app/shared/models/eventLight';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
urlGetAllEvents:string = 'https://localhost:7238/Api/Event/getAllEvents/';


eventList : EventLight[] = [];

  constructor(private _eventService : EventService) {
    // this.eventList = this._eventService.getAll();
  }

  ngOnInit() {
    this.loadEvents();
  }
  loadEvents() {
    this._eventService.getAll().subscribe({
      next: (events) => {
        this.eventList = events;
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

