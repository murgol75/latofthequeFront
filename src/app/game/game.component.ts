import { Component } from '@angular/core';
import { GameList } from '../shared/models/GameList';
import { GameService } from '../shared/services/game.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  isOpen = false;
  isAdminConnected: boolean = false;
  isUserConnected: boolean = false;

  constructor(private _authService: AuthService) {
    this._authService.$userToken.subscribe(u => {
      if (u) {
        this.updateUserStatus(u);
      } else {
        this.isAdminConnected = false;
        this.isUserConnected = false;
      }
    });
  }

  private updateUserStatus(token: string): void {
    const decodedPayload: string = atob(token.split('.')[1]);
    const parsedPayload: any = JSON.parse(decodedPayload);
    const role = parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdminConnected = role === 'Admin';
    this.isUserConnected = role === 'Admin' || role === 'User';
  }



}
