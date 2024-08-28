import { Component } from '@angular/core';
import { Game } from 'src/app/shared/models/Game';
import { GameList } from 'src/app/shared/models/GameList';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GameService } from 'src/app/shared/services/game.service';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  gameList: GameList[] = [];
  isAdminConnected: boolean = false;


  constructor(
    private _gameService: GameService,
    private _authService: AuthService) {
    this._authService.$userToken.subscribe(u => {
      if (u) {
        this.updateUserStatus(u);
      } else {
        this.isAdminConnected = false;
      }

    });


};


  private updateUserStatus(token: string): void {
  const decodedPayload: string = atob(token.split('.')[1]);
  const parsedPayload: any = JSON.parse(decodedPayload);
  const role = parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  this.isAdminConnected = role === 'Admin';
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



delete1(id: number) {
  this._gameService.delete(id).subscribe({
    next: () => {
      this.loadGames();
    },
    error: (err) => {
      console.error('je n\'ai pu supprimer le jeu', err);
    }
  });
}

delete (id: number, gameName: string) {
  const userInput = prompt(`Veuillez entrer le nom du jeu "${gameName}" pour confirmer la suppression:`);

  if (userInput === gameName) {
    this._gameService.delete(id).subscribe({
      next: () => {
        this.loadGames();
      },
      error: (err) => {
        console.error('Je n\'ai pu supprimer le jeu', err);
      }
    });
  } else {
    alert('Le nom saisi est incorrect. La suppression a été annulée.');
  }
}


}
