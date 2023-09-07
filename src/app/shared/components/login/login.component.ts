import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';

import * as sharedActions from '../../../root-store/shared-store/actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store$: Store<any>
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        console.log(response);
        const token = response.token;
        this.authService.setToken(token);
        this.errorMessage = null;
        this.router.navigate(["/dashboard"])
        this.store$.dispatch(sharedActions.setLoggedUser({ user: response.loggedUser }))
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }

}
