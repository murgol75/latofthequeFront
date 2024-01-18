import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent {

eventForm : FormGroup;
eventId : number;
  event : Event | undefined;

constructor(
  private _fb : FormBuilder,
  private _activeRoute : ActivatedRoute, 
  private _eventService : EventService, 
  private _router : Router) {
    this.eventForm = this._fb.group({
      startTime : [null],
      endTime : [null],
      registrationClosingDate : [null],
      eventName : [null],
      eventDescription : [null]
      // eventuellement une liste de joueurs
    });

    this.eventId =+this._activeRoute.snapshot.params['id'];


  if(!event) {
    this._router.navigateByUrl('/notfound');
  }

  // ici pour ajouter les joueurs qui sont liés à l'évenement
  
  // on met à jour le formulaire avec patchvalue
  // this.eventForm.patchValue({
  //   startTime : event?.startTime,
  //   endTime : event?.endTime,
  //   registrationClosingDate : event?.registrationClosingDate,
  //   eventName : event?.eventName,
  //   eventDescription : event?.eventDescription
  // });
}
}