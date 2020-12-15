import { Category } from './../../../../_model/Category';
import { CategoryService } from './../../../../Services/Category/category.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;
  constructor(private categoryService: CategoryService) { }
  categoryList = [];

  users$: any[] = [];

  dtOptions: DataTables.Settings = {
  };
  dtTrigger: Subject<any> = new Subject();

  ngOnInit() {
    this.categoryService.getallCategory()
        .pipe(first())
        .subscribe(
          data => {
            this.categoryList =  data.data['categories'];
            this.users$ = data;
            this.dtTrigger.next();
          },
          error => {
            this.categoryList = [];
          });
    this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true
          };
  }

  onDelete(CategoryId){
    this.categoryService.deletecategory(CategoryId)
        .pipe(first())
        .subscribe(
          data => {
            if(data.data.category == true){
              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Category has been deleted successfully';
              this.showErrorStatus =  false;

              this.categoryList = this.categoryList.filter((value) => {
                return value.categoryId !== CategoryId;
              });

            } else {
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Category has not been deleted, can be seen in browser console';
              console.log('Error in Deleting Category');
            }
          },
          error => {
            console.log(error);
          });
  }

}
