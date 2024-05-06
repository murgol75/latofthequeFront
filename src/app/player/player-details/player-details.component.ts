import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameListUser, PlayerGame } from 'src/app/shared/models/GameList';
import { KeywordList } from 'src/app/shared/models/KeywordList';
import { ThemeList } from 'src/app/shared/models/ThemeList';
import { UserFull } from 'src/app/shared/models/UserFull';
import { UserReceived } from 'src/app/shared/models/UserReceived';
import { EventLight } from 'src/app/shared/models/eventLight';
import { PlayerService } from 'src/app/shared/services/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss']
})
export class PlayerDetailsComponent implements OnInit {

  playerItem: UserFull | undefined;
  connectedUser: UserReceived | undefined;
  isAdminConnected: boolean = false;
  isUserConnected: boolean = false;
  eventListFutur: EventLight[] = [];
  eventListPast: EventLight[] = [];
  eventListOwner: EventLight[] = [];
  keywordList: KeywordList[] = [];
  themeList: ThemeList[] = [];
  gameList: GameListUser[] = [];
  showInfo = false;
  showEvents = false;
  showEventFutur = false;
  showEventPast = false;
  showEventOwner = false;
  showKeywords = false;
  showThemes = false;
  showGames = false;





  constructor(private _activeRoute: ActivatedRoute,
    private _playerService: PlayerService,
    private _router: Router) {
    // récupérer l'ID du joueur
    let playerId = +this._activeRoute.snapshot.params["id"];

    this._playerService.getById(playerId).subscribe({
      next: (value) => {
        this.playerItem = value;
        if (!this.playerItem) {
          this._router.navigateByUrl('notfound');
        }
        else {
          this.CreateEventListFutur(this.playerItem);
          this.CreateEventListPast(this.playerItem);
          this.CreateEventListOwner(this.playerItem);
          this.CreateKeywordList(this.playerItem);
          this.CreateThemeList(this.playerItem);
          this.CreateGameList(this.playerItem);
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

toggleInfo() : void {
  this.showInfo = !this.showInfo;
}
toggleEvents() : void {
  this.showEvents = !this.showEvents;
}
toggleEventFutur() : void {
  this.showEventFutur = !this.showEventFutur;
}
toggleEventPast() : void {
  this.showEventPast = !this.showEventPast;
}
toggleEventOwner() : void {
  this.showEventOwner = !this.showEventOwner;
}
toggleKeywords() : void {
  this.showKeywords = !this.showKeywords;
}
toggleThemes() : void {
  this.showThemes = !this.showThemes;
}
toggleGames() : void {
  this.showGames = !this.showGames;
}




  CreateEventListFutur(playerItem: UserFull): void {
    const currentDate = new Date();
    this.eventListFutur = playerItem.events.filter(events => new Date(events.startTime) >= currentDate);
  }

  CreateEventListPast(playerItem: UserFull): void {
    const currentDate = new Date();
    this.eventListPast = playerItem.events.filter(events => new Date(events.startTime) < currentDate);
  }

  CreateEventListOwner(playerItem: UserFull): void {
    this.eventListOwner = playerItem.events.filter(events => events.fkOrganizerId === playerItem.playerId);
    // console.log(playerItem.events);
    // console.log(this.eventListOwner);
  }
  CreateKeywordList(playerItem: UserFull): void {
    if (playerItem && playerItem.playerKeywords) {
      this.keywordList = playerItem.playerKeywords.map(keywordItem => ({
        keywordName: keywordItem.fkKeyword.keywordName,
        keywordNote: keywordItem.keywordNote
      }));
    } else {
      console.warn("La propriété `playerKeywords` est manquante ou vide dans l'objet `playerItem`.");
      this.keywordList = [];
    }
  };

  CreateThemeList(playerItem: UserFull): void {
    if (playerItem && playerItem.playerThemes) {
      this.themeList = playerItem.playerThemes.map(themeItem => ({
        themeName: themeItem.fkTheme.themeName,
        themeNote: themeItem.themeNote
      }));
    } else {
      console.warn("La propriété `playerTheme` est manquante ou vide dans l'objet `playerItem`.");
      this.keywordList = [];
    }
  };

  CreateGameList(playerItem: UserFull): void {
    console.log(playerItem)
    console.log(playerItem.playerGames)
    this.gameList = playerItem.playerGames.map(gameItem => ({
      gameId : gameItem.fkGame.gameId,
      gameName: gameItem.fkGame.gameName,
    }))
    console.log(this.gameList)
  };
  
}
