import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { UserReceived } from './shared/models/UserReceived';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'luthofthequeFront';
  connectedUser : UserReceived | undefined;
  constructor(private _authService : AuthService) {

  }

  ngOnInit() : void {

this._authService.$connectedUser.subscribe({
  next : (value) => {
    this.connectedUser = value;
  },
  error : (err) => {},
  complete : () => {console.log(this.connectedUser);
  console.log("test")}
});

  }


}
