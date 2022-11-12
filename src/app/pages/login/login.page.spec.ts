import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppState } from 'src/store/AppState';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
      AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({})]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);


    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should go to homepage on login', () => {
    spyOn(router, 'navigate');

    component.register();
    
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });
});
