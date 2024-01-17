import { Component, OnInit } from '@angular/core';
import { UserReceived } from '../../models/UserReceived';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isOpen = false;
  isAdminConnected: boolean = false;
  isUserConnected: boolean = false;
  

  constructor(private _authService: AuthService) {  }

    // new Claim(ClaimTypes.Name, user.Nickname),
    // new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin" : "User") 

    ngOnInit(): void {
      // const user: string | undefined = undefined;
      const storedUser: string | null = localStorage.getItem('Token');

      if (storedUser) {
          const decodedPayload: string = atob(storedUser.split('.')[1]);
          const parsedPayload: any = JSON.parse(decodedPayload);

          const nom = parsedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
          const role = parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

          console.log(nom, role);

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
      }}
  // ngOnInit(): void {  // ancienne version
  //   console.log(this.connectedUser);

  //   this._authService.$connectedUser.subscribe({
  //     next: (value) => {
  //       console.log(this.connectedUser);

  //       console.log(value);
  //       this.connectedUser = value;
  //     },
  //     error: (err) => { },
  //     complete: () => {
  //       console.log(this.connectedUser);
  //       console.log("test")
  //     }
  //   });

  // }





  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  disconnect():void {
    this._authService.logout();
  }
}
