import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
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

  user : UserReceived |undefined;
  private _$connectedUser : BehaviorSubject<UserLight | undefined> = new BehaviorSubject<UserLight | undefined>(undefined);
  $connectedUser : Observable<UserLight | undefined> = this._$connectedUser.asObservable();
private _$userToken : BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
$userToken : Observable<string | undefined> = this._$userToken.asObservable();


  constructor(private _http: HttpClient,
    private _router: Router) {}
  

  getUser() : void {  // super utile pour recuperer le token quand on va rafraichir la page (dans app.component.ts il va voir si il y a un user)
    console.log('debut getUser');
    let token : string | null = localStorage.getItem('Token');
    console.log('il a recuperé le token');
    console.log(token);
    if (token) {
      console.log('le token existe');
          this._http.get<UserReceived>(`${this._baseUrl}/Auth/UserInfo`, {
            headers:{'Authorization': `Bearer ${token}`} // correspond à la demande de bearer token dans les contollers en back
          }).subscribe({
            next:(res) => {
              const userLight: UserLight = {
                playerId:res.member.playerId,
                nickname:res.member.nickname
              }
              this._$connectedUser.next(userLight);
              console.log(JSON.stringify(this._$connectedUser));
            },
            error:(err) => {
              console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
            }
          });
        }
      }
    

      // registerUrlApi : string = 'https://localhost:7238/api/Auth/CreatePlayer' 
      // this._http.get<User>(`${this._baseUrl}/Auth/UserInfo`, {



create(register:Register):void {
this._http.post(`${this._baseUrl}/Auth/CreatePlayer`, register).subscribe({ //this.registerForm.value envoie un json
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


login(user : UserReceived):void {
  console.log('debut de login()');
        this._http.post<UserReceived>(`${this._baseUrl}/Auth/Login`, user).subscribe({
          next: (res: UserReceived) => {
            console.log('next UserReceived');
  
            localStorage.setItem('Token', res.token);
            localStorage.setItem('Player', JSON.stringify(res.member));

            this._$connectedUser.next(res.member)
            console.log('res.token');
            console.log(res.token);

            this._$userToken.next(res.token);
            // this.getUser(); // Récupérer les détails après la connexion
            console.log('juste après le getUSer');
            console.log(res);
            window.location.reload();
            this._router.navigate(['event/eventList']);
          }
        });
      };

      logout() : undefined {
        //On nettoie le storage pour enlever le token
        localStorage.clear();
        this._router.navigate(['']);
        setTimeout(() => {
          window.location.reload() // on fait F5 pour raffraichir la navbar
      }, 10);
        //On met à jour notre Observable mais on sait pas encore cékoi un Observable
        return undefined;
      }
    
    

  // console.log(`${this._baseUrl}/Auth/Login`)
    // this._http.post<UserReceived>(`${this._baseUrl}/Auth/Login`, user).subscribe({
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
