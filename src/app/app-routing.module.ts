import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './shared/components/accueil/accueil.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { AdminModule } from './admin/admin.module';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { EventComponent } from './event/event.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { adminConnectedGuard } from './shared/guards/admin-connected.guard';
import { connectedGuard } from './shared/guards/connected.guard';

const routes: Routes = [
  { path : "", component : AccueilComponent },
  { path : "home", redirectTo : "/" },
  { path : "notfound", component : NotfoundComponent},
  { path : "admin", component : AdminComponent,loadChildren : () => import("./admin/admin.module").then( m => m.AdminModule), canActivate : [adminConnectedGuard]},
  { path : "auth", component : AuthComponent,loadChildren : () => import("./auth/auth.module").then( m => m.AuthModule)}, 
  { path : "event", component : EventComponent,loadChildren : () => import("./event/event.module").then( m => m.EventModule)}, 
  { path : "game", component : GameComponent,loadChildren : () => import("./game/game.module").then( m => m.GameModule)}, 
  { path : "player", component : PlayerComponent,loadChildren : () => import("./player/player.module").then( m => m.PlayerModule), canActivate : [connectedGuard]}, 
  { path : "**", redirectTo : "/notfound"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
