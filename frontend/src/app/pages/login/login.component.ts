import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ValdemortModule } from 'ngx-valdemort';
import { AddClassIfRequiredDirective } from '../../shared/directives/is-required.directive';
import { User } from '../../shared/interfaces/user.interface';
import { FakeAuthService } from '../../shared/services/fakeAuth/fake-auth.service';
import { SessionStorageService } from '../../shared/services/session-storage/session-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValdemortModule,
    AddClassIfRequiredDirective
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  public emailCtrl!: FormControl<string | null>;
  public nameCtrl!: FormControl<string | null>;
  public lastNameCtrl!: FormControl<string | null>;

  public loginFm!: FormGroup<{
    email: FormControl<string | null>;
    name: FormControl<string | null>;
    lastName: FormControl<string | null>;
  }>;

  constructor(private authService: FakeAuthService, private router: Router, private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.nameCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(2)]);
    this.lastNameCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(2)]);

    this.loginFm = this.formBuilder.group({
      email: this.emailCtrl,
      name: this.nameCtrl,
      lastName: this.lastNameCtrl
    });
  }

  onSubmit(): void {
    const saveData: User = this.loginFm.getRawValue() as User;
    this.authService.login(saveData).subscribe({
      next: (userData: User) => {
        this.sessionStorage.saveData<User>('user', userData);
        this.router.navigate(['/home']);
      }, error: () => {}
    }
    );
  }
}
