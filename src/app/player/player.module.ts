import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';


@NgModule({
  declarations: [
    PlayerDetailsComponent,
    PlayerEditComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule
  ]
})
export class PlayerModule { }
