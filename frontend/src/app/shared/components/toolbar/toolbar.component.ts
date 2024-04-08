import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { FakeAuthService } from '../../services/fakeAuth/fake-auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent{
  private authService = inject(FakeAuthService);

  public router = inject(Router);

  public get routeControl(): Boolean {
    return this.authService.isAuthenticated;
  }

  public get userData(): Partial<User> {
    return this.authService.getUserData();
  }

  public logout(): void {
    this.authService.logout();
    location.reload();
  }
}
