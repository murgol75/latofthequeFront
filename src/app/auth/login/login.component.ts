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

  constructor(
    private _fb: FormBuilder,
    // private _httpClient : HttpClient,
    private _router: Router,
    private _authService: AuthService) {
    this.loginForm = this._fb.group({
      Nickname: [null, Validators.required],
      Password: [null, Validators.required]
    });
  }

  connect(): void {
    
    if (!this.loginForm.valid) {
      console.log('pas valide');
    } else {
      this._authService.login(this.loginForm.value);
    }
  }
}

