import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/shared/models/Game';
import { KeywordListId } from 'src/app/shared/models/KeywordListId';
import { ThemeListId } from 'src/app/shared/models/ThemeListId';
import { GameService } from 'src/app/shared/services/game.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit{
  updateForm: FormGroup;
  keywordList: KeywordListId[] = [];
  themeList: ThemeListId[] = [];
  selectedFile: File | null = null;
  gameId: number | null = null; // Stocke l'ID du jeu à mettre à jour

  constructor(
    private _gameService: GameService,
    private _fb: FormBuilder,
    private _routeur: Router,
    private _route: ActivatedRoute // Pour récupérer l'ID du jeu à partir de l'URL
  ) {
    this.updateForm = this._fb.group({
      gameName: ["", Validators.required],
      playersMin: [1, [Validators.required, Validators.min(1)]],
      playersMax: [1, Validators.required],
      averageDuration: [1, Validators.required],
      ageMin: [1, Validators.required],
      picture: [""],
      gameDescription: ["", Validators.required],
      video: ["", Validators.required],
      fkThemeId: [null, Validators.required],
      isExtension: [false, Validators.required],
      fkKeywordsId: this._fb.array([]),
    });
  }

  // Getter pour récupérer les Keywords dans notre FormGroup comme étant un FormArray
  get fkKeywordsId(): FormArray {
    return this.updateForm.get('fkKeywordsId') as FormArray;
  }

  addKeyword(): void {
    this.fkKeywordsId.push(this._fb.control(null, [Validators.required]));
  }

  removeKeyword(indice: number): void {
    this.fkKeywordsId.removeAt(indice);
  }

  loadKeywords(): void {
    this._gameService.getAllKeywords().subscribe({
      next: (keyword) => {
        this.keywordList = keyword;
      },
      error: (err) => {
        console.error('Error loading keywords', err);
      }
    });
  }

  loadThemes(): void {
    this._gameService.getAllThemes().subscribe({
      next: (theme) => {
        this.themeList = theme;
      },
      error: (err) => {
        console.error('Error loading themes', err);
      }
    });
  }

  loadGame(): void {
    if (this.gameId !== null) {
      this._gameService.getById(this.gameId).subscribe({
        next: (game: Game) => {
          // Patch le formulaire avec les données du jeu, y compris fkThemeId pour le thème
          this.updateForm.patchValue({
            gameName: game.gameName,
            playersMin: game.playersMin,
            playersMax: game.playersMax,
            averageDuration: game.averageDuration,
            ageMin: game.ageMin,
            picture: game.picture,
            gameDescription: game.gameDescription,
            video: game.video,
            isExtension: game.isExtension,
            fkThemeId: game.fkThemeId,  // Utilise l'ID du thème pour préremplir le champ select
            // fkTheme:game.fkTheme
          });
  
          // Remplir les mots-clés dans le tableau
          game.fkKeywords.forEach((keywordName: string) => {
            const keyword = this.keywordList.find(k => k.keywordName === keywordName);
            if (keyword) {
              this.fkKeywordsId.push(this._fb.control(keyword.keywordId));
            }
          });
          console.log(game);
        },
        error: (err) => {
          console.error('Error loading game', err);
        }
      });
    }
  }
  
  

  // onFileChange(event: any): void {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0];
  //     this.updateForm.patchValue({
  //       picture: this.selectedFile!.name
  //     });
  //   }
  // }

  updateGame(): void {
    if (!this.updateForm.valid) {
      this.updateForm.markAllAsTouched();
      console.log('Formulaire invalide');
      console.log(this.updateForm.value);
    } else {
      console.log(this.updateForm.value);
      console.log('Etape 1 passée')
      const gameData = {
        ...this.updateForm.value,
        fkThemeId: Number(this.updateForm.value.fkThemeId),
        fkKeywordsId: this.updateForm.value.fkKeywordsId.map(Number)
      };
      console.log('Etape 2 passée')


      if (this.gameId !== null) {
        console.log('Je rentre dans la validation de mise à jour');

        this._gameService.update(this.gameId, gameData).subscribe({
          next: (response) => {
            console.log('Jeu mis à jour avec succès', response);
            this._routeur.navigate(['game']);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du jeu', error);

            if (error.status === 401) {
              alert('Authentification requise. Veuillez vous connecter.');
            }
          }
        });
      }
    }
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.gameId = Number(params.get('id'));
      this.loadGame();
    });

    this.loadKeywords();
    this.loadThemes();
  }
}
