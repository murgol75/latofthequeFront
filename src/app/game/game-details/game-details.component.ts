import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/shared/models/Game';
import { GameService } from 'src/app/shared/services/game.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {

  game: Game | undefined;
  videoLink:SafeUrl | undefined;

  constructor(private _activeRoute: ActivatedRoute,
    private _gameService: GameService,
    private _router: Router,
  private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    // récupérer l'ID du jeu
    let gameId = +this._activeRoute.snapshot.params["id"];

    this._gameService.getById(gameId).subscribe({
      next: (value => {
        this.game = value;
        // console.log(this.game);
        this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.game.video);
        if (!this.game) {
          this._router.navigateByUrl('notfound');
        }
      }
      )
    })
  }
}