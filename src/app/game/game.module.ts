import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GameCreateComponent,
    GameDetailsComponent,
    GameEditComponent,
    GameListComponent,
    GameComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule
],
})
export class GameModule { }
