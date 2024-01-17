import { Component } from '@angular/core';
import { GameList } from '../shared/models/GameList';
import { GameService } from '../shared/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
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
      },
      error: (err) => {
        console.error('Error loading players', err);
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
