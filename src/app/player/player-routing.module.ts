import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';

const routes: Routes = [
{ path : "playerDetails", component : PlayerDetailsComponent},
{ path : "playerEdit", component : PlayerEditComponent},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
