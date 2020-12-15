import { UserService } from './../../../../Services/Users/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  categoryList = [];
  roleList = [];
  formError = false;
  showCategory = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      categoryId: [''],
      roleId: ['', Validators.required],
    });

    this.userService.listRole()
        .pipe(first())
        .subscribe(
          data => {
            this.roleList =  data.data.roles;
            this.spinner.hide();
          },
          error => {
            this.roleList = [];
            this.spinner.hide();
          });
    this.userService.listcategory()
        .pipe(first())
        .subscribe(
          data => {
            this.categoryList =  data.data.categories;
            this.spinner.hide();
          },
          error => {
            this.categoryList = [];
            this.spinner.hide();
          });
  }
  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  onChange(event) {
    if(event == "3351c29f-5c30-4d70-b02e-58bb1b8e1a5c" ){
      this.showCategory = true;
    } else {
      this.showCategory = false;
    }
  }
  onSubmit() {
        this.spinner.show();
        console.log('CreateUserComponent -> ngOnInit -> f.password.errors', this.f.password.errors);

        this.submitted = true;
    // stop here if form is invalid
        if (this.userForm.invalid) {
      this.spinner.hide();
      this.formError = true;
      return;
    }
        this.userService.createRole(this.userForm.value.userName,
                                this.userForm.value.email,
                                this.userForm.value.password,
                                this.userForm.value.categoryId,
                                this.userForm.value.roleId)
        .pipe(first())
        .subscribe(
          data => {
            if (data.success && data.status === 200) {
              this.spinner.hide();
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'User registration has been added successfully';
              this.showErrorStatus =  false;
              this.submitted = false;
              this.userForm.reset();
            } else {
              this.spinner.hide();
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'User registration has not been added, can be seen in browser console';
              console.log('Error in creating Question');
            }
          },
          error => {
            this.spinner.hide();
            this.showSuccessStatus  = false;
            this.showErrorStatus  = true;
            this.showErrorMessage = 'Email Already Taken';
            console.log('Error in creating : ', error);
          });
  }
  getshowSuccessStatus() {
    return this.showSuccessStatus;
  }
  getshowErrorStatus() {
    return this.showErrorStatus;
  }
  geterror() {
    return this.formError;
  }

}
