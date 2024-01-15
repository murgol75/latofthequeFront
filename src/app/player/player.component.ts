import { Component, OnInit } from '@angular/core';
import { UserReceived } from '../shared/models/UserReceived';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  connectedUser : UserReceived | undefined;
  constructor(private _authService : AuthService) {

  }

  ngOnInit() : void {

this._authService.$connectedUser.subscribe({
  next : (value) => {
    console.log(value);
    this.connectedUser = value;
  },
  error : (err) => {},
  complete : () => {console.log(this.connectedUser);
  console.log("test")}
});

  }


}
