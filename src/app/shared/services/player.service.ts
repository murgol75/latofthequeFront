import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UserFull } from '../models/UserFull';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {




  private _baseUrl: string = 'https://localhost:7238/api'
  constructor(private _httpClient: HttpClient) {

   }

  getAll(): Observable<User[]> {
    
    this._httpClient.get<User>(`${this._baseUrl}/Player/getAllPlayers`)
    
    return this._httpClient.get<User[]>(`${this._baseUrl}/Player/getAllPlayers`);
  }

  getById(id: number): Observable<UserFull> {
    return this._httpClient.get<UserFull>(`${this._baseUrl}/Player/getPlayerById/${id}`);
  }

  create(user: User): Observable<User> {
    return this._httpClient.post<User>(`${this._baseUrl}/Player/getAllPlayers`, user);
  }

  update(id : number, user : User) : Observable<User> {
    return this._httpClient.put<User>(`${this._baseUrl}/Player/getAllPlayers`+id, user)
  }

  delete(id : number) : Observable<User> {
    return this._httpClient.delete<User>(`${this._baseUrl}/Player/getAllPlayers`+id);
  }
}
