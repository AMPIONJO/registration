import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.action';
import { recoverPassword } from 'src/store/login/login.actions';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>) { }
 
  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm()

    this.store.select('login').subscribe(loginState => {
      if(loginState.isRecoveringPassword){
        this.store.dispatch(show());
      }
    })
  }

  forgotEmailPassword(){
    this.store.dispatch(recoverPassword());
  }

  login(){
    this.router.navigate(['home']);
  }

  register(){
    this.router.navigate(['register']);
  }
}
