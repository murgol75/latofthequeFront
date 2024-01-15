import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventFull } from 'src/app/shared/models/eventFull';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event-cloture',
  templateUrl: './event-cloture.component.html',
  styleUrls: ['./event-cloture.component.scss']
})
export class EventClotureComponent {

eventItem : EventFull | undefined;

constructor(private _activeRoute : ActivatedRoute,
  private _eventService : EventService,
  private _router : Router) {
    let eventId = +this._activeRoute.snapshot.params["id"];

// dans get event by id il y a les joueurs, on recupere la liste là, modifier EventFull pour qu'il l'accepte
// puis lancer la méthode get games for events

    this._eventService.getById(eventId).subscribe({
      next : (value) => {
        this.eventItem = value;
        if(!this.eventItem)
        {
          this._router.navigateByUrl('notfound');
        }
        console.log(this.eventItem);
      },
      error : (err) => {},
complete : () => {}
    }
    );
  }
}
