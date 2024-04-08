import { Injectable, inject } from '@angular/core';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class FakeAuthService {
  private sessionStorage = inject(SessionStorageService);
  private usersService = inject(UsersService);

  public get isAuthenticated(): boolean {
    if (this.sessionStorage.getData('user') != null) {
      return true;
    }
    return false;
  }

  public getUserData(): Partial<User> {
    return { 
      ...this.sessionStorage.getData('user')
    } as User;
  }

  public login(loginUser: User) {
    return this.usersService.login(loginUser);
  }

  public logout() {
    this.sessionStorage.clearData();
  }
}
