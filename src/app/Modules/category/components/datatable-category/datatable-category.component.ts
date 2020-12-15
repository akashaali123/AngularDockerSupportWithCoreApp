import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/Category/category.service';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-datatable-category',
  templateUrl: './datatable-category.component.html',
  styleUrls: ['./datatable-category.component.css']
})
export class DatatableCategoryComponent implements OnInit {
  categoryList = [];
  constructor(private categoryService: CategoryService,
              private spinner : NgxSpinnerService) { }
  cols = [];
  first: number = 0;
  ngOnInit() {
    this.spinner.show();
    this.cols = [
      { field: 'name', header: 'Category Name' }
    ];
    this.categoryService.getallCategory()
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            // tslint:disable-next-line: no-string-literal
            this.categoryList =  data.data['categories'];
            console.log("DatatableCategoryComponent -> ngOnInit -> this.categoryList", this.categoryList)
          },
          error => {
            this.spinner.hide();
            this.categoryList = [];
          });
  }

}
