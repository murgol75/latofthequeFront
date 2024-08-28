import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Keyword } from 'src/app/shared/models/Keyword';
import { KeywordList } from 'src/app/shared/models/KeywordList';
import { KeywordListId } from 'src/app/shared/models/KeywordListId';
import { ThemeList } from 'src/app/shared/models/ThemeList';
import { ThemeListId } from 'src/app/shared/models/ThemeListId';
import { GameService } from 'src/app/shared/services/game.service';
import { ageValidator } from 'src/app/shared/validators/ageValidator.validator';
import { ReactiveFormsModule } from '@angular/forms';
import { intValidator } from 'src/app/shared/validators/intValidator.validator';
import { Router} from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss']
})


export class GameCreateComponent {
  createForm: FormGroup;
  keywordList : KeywordListId[] = [];
  themeList : ThemeListId[] = [];
  selectedFile: File | null = null;

  constructor(private _gameService : GameService,
    private _fb:FormBuilder,
    private _routeur:Router
    
  ) {
    this.createForm = this._fb.group({
      gameName: ["", Validators.required],
      playersMin: [1, [Validators.required, Validators.min(1)]],
      playersMax: [1, Validators.required],
      averageDuration: [1, Validators.required],
      ageMin: [1, Validators.required],
      picture: ["", Validators.required],
      gameDescription: ["", Validators.required],
      video: ["", Validators.required],
      fkThemeId: [null, Validators.required],
      isExtension: [false, Validators.required],
      fkKeywordsId: this._fb.array([]),
      
    });
  }


  
//getter pour recuperer les Keywords dans notre eformgroup comme étant un Formarray
  get fkKeywordsId() : FormArray {
    return this.createForm.get('fkKeywordsId') as FormArray;
  }

  addKeyword() : void {
    this.fkKeywordsId.push(this._fb.control(null,[Validators.required]))
  }

  removeKeyword(indice : number) : void {
    this.fkKeywordsId.removeAt(indice);
  }

  loadKeywords() { 
    this._gameService.getAllKeywords().subscribe({
      next: (keyword) => {
        this.keywordList = keyword;
        // console.log(this.gameList)
      },
      error: (err) => {
        console.error('Error loading keywords', err);
      }
    });
  }


  loadThemes() { 
    this._gameService.getAllThemes().subscribe({
      next: (theme) => {
        this.themeList = theme;
        // console.log(this.gameList)
      },
      error: (err) => {
        console.error('Error loading keywords', err);
      }
    });
  }


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.createForm.patchValue({
        picture: this.selectedFile!.name
      });
    }
  }

  createGame() {
    
    if (!this.createForm.valid) {
      this.createForm.markAllAsTouched();
      console.log('Formulaire invalide');
      console.log(this.createForm.value);
    } else {
      // Convertir fkThemeId en nombre et fkKeywordsId en tableau de nombres
      const gameData = {
        ...this.createForm.value,
        fkThemeId: Number(this.createForm.value.fkThemeId), // Convertir en nombre
        fkKeywordsId: this.createForm.value.fkKeywordsId.map(Number) // Convertir chaque élément en nombre
    };
        console.log("JEU ENREGISTRE OK");
        // uploader l'image dans le repertoire assets/gamePictures
        // ça va demander un boulot supplémentaire à gérer dans le back... pour le moment je vais mettre l'image à la main dans le repertoire

        console.log(this.createForm.value);
        this._gameService.create(gameData).subscribe({
          next: (response) => {
              console.log('Jeu enregistré avec succès', response);
              this._routeur.navigate(['game']);
          },
          error: (error) => {
              console.error('Erreur lors de l\'enregistrement du jeu', error);
              if (error.status === 401) {
                  alert('Authentification requise. Veuillez vous connecter.');
              }
          }
      });

    }
    // return 1    game
  }





  
  ngOnInit(): void {
// recupérer la liste des keywords
this.loadKeywords();


// recuperer la liste des themes
this.loadThemes();

  }
  
}
