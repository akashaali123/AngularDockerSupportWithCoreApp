import { CategoryService } from './../../../../Services/Category/category.service';
import { CandidateService } from './../../../../Services/Candidate/candidate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  formError = false;

  constructor(private formBuilder: FormBuilder, 
              private categoryService: CategoryService,
              private spinner:NgxSpinnerService) {}

  ngOnInit() {
    
    this.categoryForm = this.formBuilder.group({
      Name: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      this.spinner.hide();
      this.formError = true;
      return;
    }
    this.categoryService.createCategory(this.f.Name.value)
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'Category has been added successfully';
            this.showErrorStatus =  false;
            this.submitted = false;
            this.categoryForm.reset();
          },
          error => {
              this.spinner.hide();
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Category has not been added, can be seen in browser console';
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
