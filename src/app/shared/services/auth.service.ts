import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../models/Register';
import { User } from '../models/User';
import { UserLogin } from '../models/UserLogin';
import { UserReceived } from '../models/UserReceived';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = 'https://localhost:7238/api'; 
  registerUrlApi : string = 'https://localhost:7238/api/Auth/CreatePlayer' 
  loginUrlApi : string = 'https://localhost:7238/api/Auth/Login'
  
  user : User |undefined;
  private _$connectedUser : BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  $connectedUser : Observable<User | undefined> = this._$connectedUser.asObservable();


  constructor(private _http: HttpClient,
    private _router: Router) {}
  

  getUser() : void {
    console.log('debut getUser');
    let token : string | null = localStorage.getItem('apiToken');
    console.log('il a recuperé le token');
    console.log(token);
    if (token) {
      console.log('le token existe');
      // C'est à partir d'ici que ça foire, à priori c'est du au fait que mon controller dans mon api c'est httpPost et pas Get
          this._http.get<User>(`${this._baseUrl}/Auth/UserInfo`, {
            headers:{'Authorization': `Bearer ${token}`}
          }).subscribe({
            next:(user) => {
              this._$connectedUser.next(user);
              console.log(JSON.stringify(this._$connectedUser));
            },
            error:(err) => {
              console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
            }
          });
        }
      }
    



create(register:Register):void {
this._http.post(this.registerUrlApi, register).subscribe({ //this.registerForm.value envoie un json
  next : response => {
    console.log('register successfull : ', response)
    // renvoyer l'utilisateur sur le login
    this._router.navigate(['/users/login']);
  },
  error:error => {
    // console.log('register fail : ', error) // en vrai ne pas renvoyer l'erreur en front
    console.log('register fail : ',error)

  }
})
}
getLoggedUser(): Observable<User>{
  return this._http.get<User>(`${this._baseUrl}/Auth/login`) 
}


login(user : UserLogin):void {
  console.log('debut de login()');
      // Méthode de connexion
      // login(user: UserLogin): void {
        this._http.post<UserReceived>(this.loginUrlApi, user).subscribe({
          next: (res: UserReceived) => {
            console.log('next UserReceived');
  
            localStorage.setItem('apiToken', res.token);
  
            console.log('res.token');
            console.log(res.token);

            this.getUser(); // Récupérer les détails après la connexion
            console.log('juste après le getUSer');
  
            this._router.navigate(['player']);
          }
        });
      };

  // console.log(this.loginUrlApi)
    // this._http.post<UserReceived>(this.loginUrlApi, user).subscribe({
    //   next : (res : UserReceived) => {// res est l'objet user qu'on reçoit et il peut etre de n'importe quel type
    //     console.log(res);
    //     // on stocke le token dans le localstorage sous le nom apiToken.  Res.accesToken est le token lié au résultat
    //     localStorage.setItem('apiToken', res.token);
    //     localStorage.setItem('nickname', res.member.nickname);
    //     this._$connectedUser.next(res.member)
    //     this._router.navigate(['player']);
    //   }
    // })
    

  
  deconnect() {
    localStorage.removeItem('apiToken')
    console.log("et ça ça marche aussi")
    this._router.navigate(['/']);
}
}
