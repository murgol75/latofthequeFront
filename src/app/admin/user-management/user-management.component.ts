import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent {
  urlGetAllPlayers:string = 'https://localhost:7238/Api/Player/getAllPlayers/';


  playerList : User[] = [];
  
    constructor(private _playerService : PlayerService) {
    }
  
    ngOnInit() {
      this.loadPlayers();
    }
    loadPlayers() {
      this._playerService.getAll().subscribe({
        next: (players) => {
          this.playerList = players;
        },
        error: (err) => {
          console.error('Error loading players', err);
        }
      });
    }
  
    delete(id : number) {
      this._playerService.delete(id).subscribe({
        next:() => {
          this.loadPlayers();
        },
        error:(err) => {
          console.error('je n\'ai pu supprimer l\'évènement', err);
        }
      });
    }
}
