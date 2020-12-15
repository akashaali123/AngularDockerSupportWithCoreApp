import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../../../../Services/Authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetpasswordForm: FormGroup;
  order: string;
  email = '';
  token = '';
  submitted = false;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // Go to admin Routes
      if (this.authenticationService.currentUserRole === 'SuperAdmin' || this.authenticationService.currentUserRole === 'admin') {
        this.router.navigate(['/admin']);
      } else if (this.authenticationService.currentUserRole === 'candidate') {
        // Go to User Routes
        this.router.navigateByUrl('/candidate');
      } else if (this.authenticationService.currentUserRole === 'user') {
      // Go to User Routes
      }
    }
  }

  ngOnInit() {
    this.resetpasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {validator: this.passwordMatchValidator});
    this.route.queryParams
    .subscribe(params => {
      if (params.email && params.token) {
        this.email = params.email;
        this.token = params.token;
      } else {
        this.router.navigate(['login']);
      }
    });

    this.resetpasswordForm.valueChanges.subscribe(() => {
      if (this.f.password.value === this.f.confirmPassword.value) {
        this.error = false;
      }
    });


  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls.password.value === frm.controls.confirmPassword.value ? null : {mismatch: true};
  }

  get f() { return this.resetpasswordForm.controls; }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetpasswordForm.invalid) {
      // this.spinner.hide();
      if (this.f.password.value !== this.f.confirmPassword.value) {
        this.error = true;
        return;
      }

      return;
    }

    // this.loading = true;
    this.authenticationService.resetpassword(this.email, this.token, this.f.password.value, this.f.confirmPassword.value )
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully logged in');
          this.router.navigate(['/login']);
          // this.spinner.hide();
          return;
        },
        error => {
          // this.spinner.hide();
            console.log('Not Successfully logged in', error);
        });
      }


}
