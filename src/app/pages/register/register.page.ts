import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.action';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { RegisterPageForm } from './register.page.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup
  registerStateSubscription: Subscription;

  constructor(private router: Router, private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController) { }

  ngOnInit() {
    this.form = new RegisterPageForm(this.formBuilder).createForm()

    this.registerStateSubscription = this.store.select('register').subscribe(registerState => {

      this.onError(registerState)
 
      this.onIsRegistering(registerState)
      this.onIsRegistered(registerState)
 
      this.toggleLoading(registerState)
     })
  }

  private async onError(registerState: RegisterState){
    if(registerState.error){
      const toaster = await this.toastController.create({
        position : "bottom",
        message : registerState.error.message,
        color : "danger"
      });
      toaster.present();
    }
  }

  private toggleLoading(loginState:   RegisterState){
    if(loginState.isRegistering){
      this.store.dispatch(show())
    }
    else{
      this.store.dispatch(hide())
    }
  }

  private onIsRegistering(registerState: RegisterState){
    if(registerState.isRegistering){
      const name = this.form.get('name').value
      const email = this.form.get('email').value
      const phoneNumber = this.form.get('phoneNumber').value
      const password = this.form.get('password').value
      
      //add registration service that calls the details above as params
    }
  }

  private onIsRegistered(registerState: RegisterState){
    if(registerState.isRegistered){
      this.router.navigate(['home'])
    }
  }

  register(){
    this.store.dispatch(register())
  }


}
