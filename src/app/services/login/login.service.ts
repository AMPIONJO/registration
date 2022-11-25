import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  id: number,
  userName: string,
  password: string,
  createdDate: Date,
  email: string,
  phone: number,
  category: number
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getLoginDetails(): Observable<ApiResult>{
    return this.http.get<ApiResult>(
      `${environment.baseUrl}`
      )
    }

  getMovieDetails(id: string){
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
      )
  }
}
