import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { GameList } from '../models/GameList';
import { Game } from '../models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _baseUrl: string = 'https://localhost:7238/api'
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<GameList[]> {
    // this._httpClient.get<GameList>(`${this._baseUrl}/Game/`)
    return this._httpClient.get<GameList[]>(`${this._baseUrl}/Game/getAllGames`);
  }


  getById(id: number): Observable<Game> {
    return this._httpClient.get<Game>(`${this._baseUrl}/Game/getGameById/${id}`)
  }

  create(game: User): Observable<Game> {
    return this._httpClient.post<Game>(`${this._baseUrl}/Game/`, game);
  }

  update(id : number, game : Game) : Observable<User> {
    return this._httpClient.put<User>(`${this._baseUrl}/Game/`+id, game)
  }

  delete(id : number) : Observable<Game> {
    return this._httpClient.delete<Game>(`${this._baseUrl}/Game/`+id);
  }
}