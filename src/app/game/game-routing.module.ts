import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameCreateComponent } from './game-create/game-create.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { GameListComponent } from './game-list/game-list.component';

const routes: Routes = [
{ path : "gameCreate", component : GameCreateComponent},
{ path : "gameDetails", component : GameDetailsComponent},
{ path : "gameDetails/:id", component : GameDetailsComponent},
{ path : "gameEdit", component : GameEditComponent},
{ path : "gameEdit/:id", component : GameEditComponent},
{ path : "gameList", component : GameListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
