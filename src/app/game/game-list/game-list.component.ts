import { Component } from '@angular/core';
import { Game } from 'src/app/shared/models/Game';
import { GameList } from 'src/app/shared/models/GameList';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GameService } from 'src/app/shared/services/game.service';
import { PlayerService } from 'src/app/shared/services/player.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  gameList: GameList[] = [];
  filteredGameList: GameList[] = [];
  isAdminConnected: boolean = false;

  // Filtres
  filter = {
    name: '',
    players: null as number | null,
    duration: null as number | null,
    age: null as number | null,
    isExtension: false
  };


  constructor(
    private _gameService: GameService,
    private _authService: AuthService,
    private _router: Router) {
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
        this.applyFilters();  // Applique les filtres après chargement des jeux
        console.log(this.gameList);

        // Si tu veux vérifier un jeu spécifique
      this.gameList.forEach(game => {
        console.log(game.isExtension, typeof game.isExtension);  // Vérifie IsExtension pour chaque jeu
      });
        
      },
      error: (err) => {
        console.error('Error loading games', err);
      }
    });
  }

 // Méthode de filtrage
 applyFilters() {
  this.filteredGameList = this.gameList.filter(game => {
    const matchesName = this.filter.name ? game.gameName.toLowerCase().includes(this.filter.name.toLowerCase()) : true;
    const matchesPlayers = this.filter.players ? 
      (game.playersMin <= this.filter.players && game.playersMax >= this.filter.players) : true;
    const matchesDuration = this.filter.duration ? game.averageDuration <= this.filter.duration : true;
    const matchesAge = this.filter.age ? game.ageMin >= this.filter.age : true;
    // const matchesExtension = this.filter.isExtension ? game.IsExtension : true;
    // const matchesExtension = this.filter.isExtension ? true : !game.IsExtension;
    const matchesExtension = this.filter.isExtension ? true : !game.isExtension;

    
    return matchesName && matchesPlayers && matchesDuration && matchesAge && matchesExtension;
  });
}



  delete(id: number, gameName: string) {
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

  // updateGame(id: number) {
  //   this._router.navigate([`/game/update/${id}`]);  // Redirige vers une page de mise à jour
  // }



}
