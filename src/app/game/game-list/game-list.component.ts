import { Component } from '@angular/core';
import { Game } from 'src/app/shared/models/Game';
import { GameList } from 'src/app/shared/models/GameList';
import { GameService } from 'src/app/shared/services/game.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  
  gameList : GameList[] = [];
  
  constructor(private _gameService : GameService) {
  }

  ngOnInit() {
    this.loadGames();
  }
  loadGames() { 
    this._gameService.getAll().subscribe({
      next: (games) => {
        this.gameList = games;
        // console.log(this.gameList)
      },
      error: (err) => {
        console.error('Error loading games', err);
      }
    });
  }

  

  delete(id : number) {
    this._gameService.delete(id).subscribe({
      next:() => {
        this.loadGames();
      },
      error:(err) => {
        console.error('je n\'ai pu supprimer l\'évènement', err);
      }
    });
  }
  
  }
