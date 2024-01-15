import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventClotureComponent } from './event-cloture/event-cloture.component';

const routes: Routes = [
{ path : "eventCreate", component : EventCreateComponent},
{ path : "eventDetails/:id", component : EventDetailsComponent},
{ path : "eventCloture/:id", component : EventClotureComponent},
{ path : "eventEdit/:id", component : EventEditComponent},
{ path : "eventList", component : EventListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
