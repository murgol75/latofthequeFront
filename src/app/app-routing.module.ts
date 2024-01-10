import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './shared/components/accueil/accueil.component';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';

const routes: Routes = [
  { path : "", component : AccueilComponent },
  { path : "home", redirectTo : "/" },
  { path : "notfound", component : NotfoundComponent},
  { path : "admin", loadChildren : () => import("./admin/admin.module").then( m => m.AdminModule)},
  { path : "auth", loadChildren : () => import("./auth/auth.module").then( m => m.AuthModule)}, 
  { path : "event", loadChildren : () => import("./event/event.module").then( m => m.EventModule)}, 
  { path : "game", loadChildren : () => import("./game/game.module").then( m => m.GameModule)}, 
  { path : "player", loadChildren : () => import("./player/player.module").then( m => m.PlayerModule)}, 
  { path : "**", redirectTo : "/notfound"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
