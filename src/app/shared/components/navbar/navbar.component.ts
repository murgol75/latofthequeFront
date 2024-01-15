import { Component } from '@angular/core';
import { UserReceived } from '../../models/UserReceived';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isOpen = false;
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
  toggleAccordion() {
      this.isOpen = !this.isOpen;
  }

  logout() {
    this.connectedUser = this._authService.logout();
  }
}
