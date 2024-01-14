import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {




  private _baseUrl: string = 'https://localhost:7238/api'
  private _url: string = 'https://localhost:7238/api/Player/getAllPlayers'
  constructor(private _httpClient: HttpClient) {

   }

  getAll(): Observable<User[]> {
    
    this._httpClient.get<User>(`${this._baseUrl}/Player/getAllPlayers`)
    
    return this._httpClient.get<User[]>(this._url);
  }

  getById(id: number): Observable<User> {
    return this._httpClient.get<User>(this._url + id)
  }

  create(user: User): Observable<User> {
    return this._httpClient.post<User>(this._url, user);
  }

  update(id : number, user : User) : Observable<User> {
    return this._httpClient.put<User>(this._url+id, user)
  }

  delete(id : number) : Observable<User> {
    return this._httpClient.delete<User>(this._url+id);
  }
}
