import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Register } from '../models/Register';
import { User } from '../models/User';
import { UserLight } from '../models/UserLight';
import { UserLogin } from '../models/UserLogin';
import { UserReceived } from '../models/UserReceived';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = 'https://localhost:7238/api';

  user: UserReceived | undefined;
  private _$connectedUser: BehaviorSubject<UserLight | undefined> = new BehaviorSubject<UserLight | undefined>(undefined);
  $connectedUser: Observable<UserLight | undefined> = this._$connectedUser.asObservable();

  private _$userToken: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  $userToken: Observable<string | undefined> = this._$userToken.asObservable();


  constructor(private _http: HttpClient,
    private _router: Router) { }


  getUser(): void {  // super utile pour recuperer le token quand on va rafraichir la page (dans app.component.ts il va voir si il y a un user)
    let token: string | null = localStorage.getItem('Token');
    if (token) {
      this._http.get<UserReceived>(`${this._baseUrl}/Auth/UserInfo`, {
        headers: { 'Authorization': `Bearer ${token}` } // correspond à la demande de bearer token dans les contollers en back
      }).subscribe({
        next: (res) => {
          const userLight: UserLight = {
            playerId: res.member.playerId,
            nickname: res.member.nickname
          }
          this._$connectedUser.next(userLight);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
        }
      });
    }
  }


  
  
  // create(register: Register) {
  //   // Notez qu'il n'y a pas de souscription ici, juste le retour de l'Observable
  //   return this._http.post(`${this._baseUrl}/Auth/CreatePlayer`, register);
  // }


  create(register: Register): void {
    this._http.post(`${this._baseUrl}/Auth/CreatePlayer`, register).subscribe({ //this.registerForm.value envoie un json
      next: response => {
        // if faut afficher un message qui dit "Votre compte a bien été créé.  Toutes vos préférences ont été mises à 3, vous pouvez vous connecter et aller sur votre profil pour modifier... "
        // this._router.navigate(['auth/login']);
      }
    })
  }



  getLoggedUser(): Observable<User> {
    return this._http.get<User>(`${this._baseUrl}/Auth/login`)
  }

  login(user: UserReceived): void {
    this._http.post<UserReceived>(`${this._baseUrl}/Auth/Login`, user).subscribe({
      next: (res: UserReceived) => {

        localStorage.setItem('Token', res.token);
        localStorage.setItem('Player', JSON.stringify(res.member));
        localStorage.setItem('Id', res.member.playerId.toString());

        this._$connectedUser.next(res.member)

        this._$userToken.next(res.token);
        this._router.navigate(['player/playerDetails']);
      }
    });
  };

  logout(): undefined {
    //On nettoie le storage pour enlever le token
    localStorage.clear();
    this._router.navigate(['']);
    setTimeout(() => {
      window.location.reload() // on fait F5 pour raffraichir la navbar
    }, 10);
    return undefined;
  }

  deconnect() {
    localStorage.removeItem('apiToken')
    this._router.navigate(['/']);
  }
}