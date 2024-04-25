import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ageValidator } from 'src/app/shared/validators/ageValidator.validator';

@Component({
  selector: 'app-createplayer',
  templateUrl: './createplayer.component.html',
  styleUrls: ['./createplayer.component.scss']
})
export class CreateplayerComponent {
  createForm: FormGroup;
  isAdminConnected: boolean = false;
  isUserConnected: boolean = false;
  actualYear : number = new Date().getFullYear();
  year : number = this.actualYear-7;
  showSuccessMessage: boolean = false;
  successMessage: string = "Ton compte a bien été créé. Toutes tes préférences ont été mises à 3, tu peux te connecter et aller sur ton profil pour les modifier!";

  constructor(
  private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService) {
    this.createForm = this._fb.group({
      Nickname: [null, Validators.required],
      HashPwd: [null, [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{5,}$/)]],
      Birthdate: [null, [Validators.required,ageValidator(7)]],
      Email: [null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      IsAdmin: [false]
    });
  }

  ngOnInit(): void {
    const storedUser: string | null = localStorage.getItem('Token');

    if (storedUser) {
        const decodedPayload: string = atob(storedUser.split('.')[1]);
        const parsedPayload: any = JSON.parse(decodedPayload);

        const nom = parsedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
        const role = parsedPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];


        if (role === 'Admin') {
          
            this.isAdminConnected = true;
            this.isUserConnected = true;

        }
        else if (role === 'User') {
            this.isAdminConnected = false;
            this.isUserConnected = true;

        }
        else {
            this.isAdminConnected = false;
            this.isUserConnected = false;

        }
    }}

  signIn(): void {
    
    if (!this.createForm.valid) {
      this.createForm.markAllAsTouched();
      console.log('Formulaire invalide');
    } else {
      console.log(this.createForm.value);
      this.showSuccessMessage = true;
      this._authService.create(this.createForm.value);
      
    }
  }
  disconnect():void {
    this._authService.logout();
  }

}
