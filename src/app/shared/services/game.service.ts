import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/User';
import { GameList } from '../models/GameList';
import { Game } from '../models/Game';
import { KeywordListId } from '../models/KeywordListId';
import { ThemeListId } from '../models/ThemeListId';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _baseUrl: string = 'https://localhost:7238/api'
  constructor(private _httpClient: HttpClient,
    private _router: Router
  ) {}

  getAll(): Observable<GameList[]> {
    // this._httpClient.get<GameList>(`${this._baseUrl}/Game/`)
    return this._httpClient.get<GameList[]>(`${this._baseUrl}/Game/getAllGames`);
  }


  getById(id: number): Observable<Game> {
    return this._httpClient.get<Game>(`${this._baseUrl}/Game/getGameById/${id}`)
  }

  create(game: User): Observable<Game> {
    return this._httpClient.post<Game>(`${this._baseUrl}/Game/createGame`, game);
}

  update(id : number, game : Game) : Observable<User> {
    return this._httpClient.put<User>(`${this._baseUrl}/Game/`+id, game)
  }

  delete(id : number) : Observable<Game> {
    return this._httpClient.delete<Game>(`${this._baseUrl}/Game/deleteGame/`+id);
  }

  getAllThemes(): Observable<ThemeListId[]> {
    return this._httpClient.get<ThemeListId[]>(`${this._baseUrl}/Game/getAllThemes`);
  }
  getAllKeywords(): Observable<KeywordListId[]> {
    return this._httpClient.get<KeywordListId[]>(`${this._baseUrl}/Game/getAllKeywords`);
  }

  
}