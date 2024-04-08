import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  /*========================================
  CRUD Methods for consuming RESTful API
   =========================================*/
  // Http Options
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiUrl: string = API_ENDPOINT;

  public login(loginUser: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, JSON.stringify({...loginUser, id: null}), this.httpOptions);
  }
}
