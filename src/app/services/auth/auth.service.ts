import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { environment } from 'src/environments/environment';
import { ApiResult } from '../ApiResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  recoverEmailPassword(email: string): Observable<void>{
    return new Observable<void>(observer => {
      setTimeout(()=> {
        if(email == "error@email.com"){
          observer.error({message: "Email not found"})
        }
        observer.next();
        observer.complete();
      }, 3000)
    })
  }

  login(email: string, password: string): Observable<User>{
    return new Observable<User>(observer => {
      setTimeout(() => {
        if(email == null){
          observer.error({message: 'User not found'})
          observer.next();
        }else{
          const user = new User();
          user.email = email;
          user.password = password;
          observer.next(user)
        }
        observer.complete()
      }, 3000)
    })
  }

  getLogins(): Observable<ApiResult>{
    return this.http.get<ApiResult>(
      `${environment.baseUrl}`
      )
    }
}
