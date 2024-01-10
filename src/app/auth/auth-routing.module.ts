import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateplayerComponent } from './create-player/createplayer.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{ path : "createPlayer", component : CreateplayerComponent},
{ path : "login", component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
