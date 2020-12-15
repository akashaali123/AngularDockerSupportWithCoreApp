import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/Users/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  id = null;
  currentUser = null;
  formError = false;
  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private routes: Router,
              private spinner: NgxSpinnerService,
              private route: ActivatedRoute) {}

  ngOnInit() {
     
    this.spinner.show();
    this.userForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      // MaxExp: ['', Validators.required]
    });

    this.route.paramMap
    .subscribe(params => {

     // tslint:disable-next-line: no-string-literal
      this.id = params['params']['id'];

      this.userService.getUserById(this.id)
      .pipe(first())
          .subscribe(
            data => {
              this.spinner.hide();
              this.currentUser = data.data.user;
              // console.log('EditExperienceComponent -> ngOnInit -> this.currentExpLevel', this.currentExpLevel);
              if (this.currentUser == null) {
                this.routes.navigate(['login']);
              }
              // console.log('TCL: EditCandidateComponent -> ngOnInit -> this.currentCandidate', this.currentExpLevel);
              this.updateRecords(this.currentUser.userName, this.currentUser.email);
            },
            error => {
              this.spinner.hide();

            });

        });
      }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }


  updateRecords(userName, email) {
    // console.log('EditExperienceComponent -> updateRecords -> Expname, min, max', Expname, min, max);
    this.userForm.patchValue({
      Name: userName,
      Email: email,
      
    });
  }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      this.formError = true;
      this.spinner.hide();

      return;
    }

    this.userService.updateUser(this.id,
      this.userForm.value.Name,
      this.userForm.value.Email,
      )
        .pipe(first())
        .subscribe(
          data => {

            
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'User has been Updated successfully';
            this.showErrorStatus =  false;
            console.log('I am Response ' ,data);
            this.spinner.hide();
          },
          error => {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'User has not been Updated, can be seen in browser console';
              console.log('Error in creating : ', error);
              this.spinner.hide();
          });
    

  }
  getshowSuccessStatus() {
    return this.showSuccessStatus;
  }
  getshowErrorStatus() {
    return this.showErrorStatus;
  }

}
