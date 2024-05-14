import { Component, OnInit } from '@angular/core';
import { UserReceived } from '../shared/models/UserReceived';
import { AuthService } from '../shared/services/auth.service';
import { PlayerService } from '../shared/services/player.service';
import { UserLight } from '../shared/models/UserLight';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  connectedUser: UserReceived | undefined;
  isAdminConnected: boolean = false;
  isUserConnected: boolean = false;
  nickname:string = "";
  playerId:number | null = null;
  constructor(private _playerService: PlayerService) {}

  ngOnInit(): void {
    const storedUser: string | null = localStorage.getItem('Token');
    let playerIdNumber:number | null = null;
    
    if (storedUser) {
      const decodedPayload: string = atob(storedUser.split('.')[1]);
      const parsedPayload: any = JSON.parse(decodedPayload);

      // rechercher l'ID qui est dans l'objet player dans le local storage
      const playerDataString: string | null = localStorage.getItem('Player');
      if (playerDataString !== null) {
        console.log("playerDataString n'est pas null")
        const PlayerData: { playerId:number; nickname:string} = JSON.parse(playerDataString);
        console.log("PlayerData:", PlayerData);
        playerIdNumber = PlayerData.playerId;
        console.log("playerIdNumber = ",playerIdNumber, " | Type de playerIdNumber : ", typeof playerIdNumber)
      }
      
      const nom = parsedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const role = parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      
      this.isAdminConnected = false;
      this.isUserConnected = false;

      if (role === 'Admin') {
        this.isAdminConnected = true;
        this.isUserConnected = true;
      }
      else if (role === 'User') {
        this.isUserConnected = true;
      }
      this.nickname = nom
      this.playerId = playerIdNumber;
    }
  }

}
