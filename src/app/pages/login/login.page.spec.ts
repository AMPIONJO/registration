import { Query } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { User } from 'src/app/model/user/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { loginReducer } from 'src/store/login/login.reducers';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let store: Store<AppState>;
  let page;
  let toastController: ToastController;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
      AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
  StoreModule.forFeature("loading", loadingReducer),
StoreModule.forFeature("login", loginReducer)]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);
    authService = TestBed.inject(AuthService);


    component = fixture.componentInstance;
    fixture.detectChanges();
    page = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form on init', () =>{
    component.ngOnInit()

    expect(component.form).not.toBeUndefined()
  })

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');

    component.register();
    
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {
    //start page
    fixture.detectChanges();
    //user set valid e mail
    component.form.get('email').setValue("valid.email.com")
    //user clicked on forgot e mail/password button
    page.querySelector("#recoverPasswordButton").click();
    //expect loginPage.isRecoveringPassword is true
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  })

  it('should show loading when is recovering password', () => {
    //start page
    fixture.detectChanges();
    //change isRecoveringPassword to true
    store.dispatch(recoverPassword());
    //verify loadingtate.show == true
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
      })
  })

  it('should hide loading and show success message when has recovered password', () => {
    spyOn(toastController, 'create');
    //start page
    fixture.detectChanges();
    //set login state as recovering password
    store.dispatch(recoverPassword())
    //set loginState as recovered password
    store.dispatch(recoverPasswordSuccess())
    //verify loadingState.show == false. Subscribe to it to get access to the loading state
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy()
    })
    //verify message was shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should hide loading and show error message when error on recover password', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));
    //start page
    fixture.detectChanges();
    //recover password
    store.dispatch(recoverPassword());
    //recover password fail
    store.dispatch(recoverPasswordFail({error: "message"}));
    //expect loading not showing
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy()
    })
    //expect error shown
    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should show loading and start login when logging in', () => {
    //start page
    fixture.detectChanges();
    //set a valid e mail
    component.form.get('email').setValue('valid@email.com')
    //set any password
    component.form.get('password').setValue('anyPassword')
    //click on login button
    page.querySelector('#loginButton').click();
    //expect loading is showing
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
    //expect logging in
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy();
    })
  })

  it('should hide loading and send user to home page when user has logged in', () => {

    spyOn(router, 'navigate')
    spyOn(authService, 'login').and.returnValue(of(new User))//simulates calling of the backend

    //start page
    fixture.detectChanges()
    //set valid e mail
    component.form.get('email').setValue('valid@email.com')
    //set valid password
    component.form.get('password').setValue('anyPassword')
    //click on login button
    page.querySelector('#loginButton').click()
    //expect loading hidden
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    //expect logged in
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy();
    })
    //expect home page showing
    expect(router.navigate).toHaveBeenCalledWith(['home'])
  })

  it('should hide loading and show error when user cant login', () => {
    spyOn(authService, 'login').and.returnValue(throwError({message: 'error'}))//simulates calling of the backend
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    //start page
    fixture.detectChanges()
    //set error e mail
    component.form.get('email').setValue('error@email.com')
    //set password
    component.form.get('password').setValue('anyPassword')
    //click on login button
    page.querySelector('#loginButton').click()
    //expect loading is hidden
    store.select('loading').subscribe(loadingState => {
    expect(loadingState.show).toBeFalsy();
  })
  //expect error message was shown
  expect(toastController.create).toHaveBeenCalledTimes(1);
  })
});
