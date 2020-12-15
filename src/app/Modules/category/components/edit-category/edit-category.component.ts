import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../../../Services/Category/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  categoryId = null;
  currentCategory = null;
  formError = false;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private spinner: NgxSpinnerService,
              private routes: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      Name: ['', Validators.required]
    });

    this.route.paramMap
    .subscribe(params => {

      // tslint:disable-next-line: no-string-literal
      this.categoryId = params['params']['id'];

      this.categoryService.getCategoryById(this.categoryId)
      .pipe(first())
          .subscribe(
            data => {
              this.currentCategory = data.data.category;
              if (this.currentCategory == null) {
                this.routes.navigate(['login']);
              }
              // console.log('TCL: EditCandidateComponent -> ngOnInit -> this.currentCandidate', this.currentCategory);
              this.updateRecords(this.currentCategory.name);
            },
            error => {
      });

    });




  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }


  updateRecords(CatgeoryName) {
    this.categoryForm.patchValue({
      Name: CatgeoryName
    });
  }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      this.spinner.hide();
      this.formError = true;
      return;
    }

    this.categoryService.updateCategory(this.categoryId, this.f.Name.value)
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            this.showSuccessStatus =  true;
            this.showSuccessMessage = 'Category has been Updated successfully';
            this.showErrorStatus =  false;
          },
          error => {
              this.spinner.hide();
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Category has not been Updated, can be seen in browser console';
              console.log('Error in creating : ', error);
          });
  }
  getshowSuccessStatus() {
    return this.showSuccessStatus;
  }
  getshowErrorStatus() {
    return this.showErrorStatus;
  }

}
