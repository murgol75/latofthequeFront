import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  isAdminConnected: boolean = false;
  isUserConnected: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService) {
    this.loginForm = this._fb.group({
      Nickname: [null, Validators.required],
      Password: [null, Validators.required]
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


  connect(): void {
    
    if (!this.loginForm.valid) {
    } else {
      this._authService.login(this.loginForm.value);
    }
  }

  disconnect():void {
    this._authService.logout();
  }
}

