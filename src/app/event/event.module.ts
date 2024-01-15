import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventClotureComponent } from './event-cloture/event-cloture.component';

@NgModule({
  declarations: [
    EventCreateComponent,
    EventDetailsComponent,
    EventEditComponent,
    EventListComponent,
    EventComponent,
    EventClotureComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule
  ]
})
export class EventModule { }
