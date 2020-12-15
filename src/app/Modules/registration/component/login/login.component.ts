import { AuthenticationService } from './../../../../Services/Authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginerror = false;
  usererror = false;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private location: Location
    ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      // Go to admin Routes
      if (this.authenticationService.currentUserRole === 'SuperAdmin' || this.authenticationService.currentUserRole === 'admin') {
        this.router.navigate(['/admin']);
      } else if (this.authenticationService.currentUserRole === 'candidate') {
        // Go to User Routes
        this.router.navigateByUrl('/candidate');
      } else if (this.authenticationService.currentUserRole === 'contributor') {
        // Go to User Routes
        this.router.navigateByUrl('/contributor');
      } else if (this.authenticationService.currentUserRole === 'verifier') {
        // Go to User Routes
        this.router.navigateByUrl('/verifier');
      } else if (this.authenticationService.currentUserRole === 'user') {
      // Go to User Routes
      }
    }
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.usererror = false;
    this.loginerror = false;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        console.log("LoginComponent -> onSubmit -> this.loginForm.invalid", this.loginForm.invalid)
        return;
    }

    // this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if(data.status == 400 && data.success == false ){
            console.log("LoginComponent -> onSubmit -> data", data)
            this.loginerror = true;
            this.loading = false;
          } else
          if(data.status == 502 && data.success == false ){
            this.loginerror = true;
            this.loading = false;
          }
          else {
            window.location.reload();
          }
        },
        error => {
            console.log('Not Successfully logged in', error);
            this.usererror = true;
            this.loading = false;
        });
  }
  geterror() {
    return this.loginerror;
  }
}
