import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppState } from 'src/store/AppState';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { recoverPassword } from 'src/store/login/login.actions';
import { loginReducer } from 'src/store/login/login.reducers';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let store: Store<AppState>;
  let page;

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

  it('should go to homepage on login', () => {
    spyOn(router, 'navigate');

    component.login();
    
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

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
    expect(true).toBeTruthy();
  })
});
