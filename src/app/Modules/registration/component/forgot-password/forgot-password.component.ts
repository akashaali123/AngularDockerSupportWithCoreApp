import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../../../Services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotpasswordForm: FormGroup;
  submitted = false;
  success = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // Go to admin Routes
      if (this.authenticationService.currentUserRole === 'SuperAdmin' ||this.authenticationService.currentUserRole === 'admin' ) {
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
    this.forgotpasswordForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
    });
  }

  get f() { return this.forgotpasswordForm.controls; }

  onSubmit() {

    this.spinner.show();
    this.submitted = true;
    // stop here if form is invalid
    if (this.forgotpasswordForm.invalid) {
        return;
    }

    // this.loading = true;
    this.authenticationService.forgotpassword(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Successfully logged in');
          this.success= true;

        },
        error => {
            console.log('Not Successfully logged in', error);
        });
  }

}
