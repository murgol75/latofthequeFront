import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/User';
import { UserReceived } from 'src/app/shared/models/UserReceived';
import { EventLight } from 'src/app/shared/models/eventLight';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  playerItem: User | undefined;
  connectedUser: UserReceived | undefined;
  isAdminConnected: boolean = false;
  isUserConnected: boolean = false;

  constructor(private _activeRoute : ActivatedRoute,
              private _playerService : PlayerService,
              private _router : Router) {
                let playerId =+this._activeRoute.snapshot.params["id"];
                this._playerService.getById(playerId).subscribe({
                  next: (value) => {
                    this.playerItem = value;
                    if (!this.playerItem) {
                      this._router.navigateByUrl('notfound');
                    }
                  }
                });
  }

  ngOnInit(): void {
    
    const storedUser: string | null = localStorage.getItem('Token');

    if (storedUser) {
      const decodedPayload: string = atob(storedUser.split('.')[1]);
      const parsedPayload: any = JSON.parse(decodedPayload);

      const nom = parsedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const role = parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

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
    }
  }
  

}