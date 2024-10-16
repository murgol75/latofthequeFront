import { Injectable } from '@angular/core';
import { EventLight } from '../models/eventLight';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventFull } from '../models/eventFull';
import {GameLight} from '../models/GameLight'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _baseUrl: string = 'https://localhost:7238/api'
  constructor(private _httpClient: HttpClient,
    private _router: Router) {}

  getAll(): Observable<EventLight[]> { // ajouter le bool registration close pour faire apparaitre le bouton resultat pour les joueurs
    this._httpClient.get<EventLight>(`${this._baseUrl}/Event/EventList`)
    return this._httpClient.get<EventLight[]>(`${this._baseUrl}/Event/getAllEvents`);
  }

  getById(id: number): Observable<EventFull> {
    return this._httpClient.get<EventFull>
    (`${this._baseUrl}/Event/getEventById/${id}`)
  }

  getGamesForAnEvent(eventId : number): Observable<GameLight[]> {
    return this._httpClient.get<GameLight[]>
    (`${this._baseUrl}/Event/getGamesForEvent/${eventId}`)
  }

  create(event: Event): Observable<Event> {
    return this._httpClient.post<Event>(`${this._baseUrl}/Event/getAllEvents`, event);
  }

  update(id : number, event : Event) : Observable<Event> {
    return this._httpClient.put<Event>(`${this._baseUrl}/Event/getAllEvents`+id, event)
  }

  delete(id : number) : Observable<Event> {
    return this._httpClient.delete<Event>(`${this._baseUrl}/Event/getAllEvents`+id);
  }
}