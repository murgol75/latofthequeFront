import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})


export class EventCreateComponent {
  createForm : FormGroup;
  url : string = "https://localhost:7238/Api/Event/createEvent/";
  OrganizerId : number = 9; // en attendant de le récupérer automatiquement à partir de l'User de l'observable


  constructor(private _fb : FormBuilder, private _httpClient : HttpClient) { // penser à faire tous les bons validators
    this.createForm = this._fb.group({
      startTime : [null, [Validators.required]],
      endTime : [null, [Validators.required]],
      fkOrganizerId : [this.OrganizerId],
      registrationClosingDate : [null, [Validators.required]],
      eventName : [null, [Validators.required]],
      eventDescription : [null, [Validators.required]]
    });
  }



  create() : void {
    if(this.createForm.valid) {
      this._httpClient.post(this.url, this.createForm.value).subscribe(() => {
        this.createForm.reset();
      })
    }
  }

}
