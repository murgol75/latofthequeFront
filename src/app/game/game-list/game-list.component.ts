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
  
    constructor() {
    }
  
  }
