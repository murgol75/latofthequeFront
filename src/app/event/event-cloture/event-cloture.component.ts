import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameLight } from 'src/app/shared/models/GameLight';
import { EventFull } from 'src/app/shared/models/eventFull';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event-cloture',
  templateUrl: './event-cloture.component.html',
  styleUrls: ['./event-cloture.component.scss']
})
export class EventClotureComponent {

  eventItem: EventFull | undefined;
  games: GameLight[] | undefined;

  constructor(private _activeRoute: ActivatedRoute,
    private _eventService: EventService,
    private _router: Router) {
    let eventId = +this._activeRoute.snapshot.params["id"];

    // puis lancer la méthode get games for events

    this._eventService.getById(eventId).subscribe({
      next: (value) => {
        this.eventItem = value;
        if (!this.eventItem) {
          this._router.navigateByUrl('notfound');
        }
        console.log(this.eventItem);
      },
      error: (err) => { },
      complete: () => { }
    }
    );
    this._eventService.getGamesForAnEvent(eventId).subscribe({
      next: (value) => {
        this.games = value;
        if (!this.games) {
          this._router.navigateByUrl('notfound');
        }
        // console.log(this.games);

      },
      error: (err) => { },
      complete: () => { }
    });


  }
}
