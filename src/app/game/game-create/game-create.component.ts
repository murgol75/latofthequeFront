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
      fkKeywordsId: this._fb.array([], Validators.required),
      
    });
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
        console.log("JEU ENREGISTRE OK")
        console.log(this.createForm.value);
      // this.showSuccessMessage = true;
      // this._authService.create(this.createForm.value);

    }
    return 1
  }





  
  ngOnInit(): void {
// recupérer la liste des keywords
this.loadKeywords();


// recuperer la liste des themes
this.loadThemes();

  }
  
}
