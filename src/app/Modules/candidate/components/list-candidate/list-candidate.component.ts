import { HttpClient } from '@angular/common/http';
import { CandidateService } from './../../../../Services/Candidate/candidate.service';
import { Component, OnInit } from '@angular/core';
import 'src/assets/scripts/main.js';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.css']
})
export class ListCandidateComponent implements OnInit {

  showSuccessStatus =  null;
  showErrorStatus = null;
  showSuccessMessage =  null;
  showErrorMessage = null;
  submitted = false;

  candidateList = [];
  ExperienceLevelList = [];
  users$: any[] = [];

  dtOptions: DataTables.Settings = {
  };
  dtTrigger: Subject<any> = new Subject();

  constructor(private http: HttpClient, 
              private candidateService: CandidateService,
              private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.candidateService.getallCandidate()
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.hide();
            this.candidateList =  data.data['candidates']
            this.users$ = data;
            this.dtTrigger.next();
          },
          error => {
            this.spinner.hide();
            this.candidateList = [];
          });
    this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true
        };
  }
  onDelete(CandidateId){
    this.candidateService.deletecandidate(CandidateId)
        .pipe(first())
        .subscribe(
          data => {
            this.spinner.show();
            if(data.data.candidate == true){
              
              console.log("success");

              this.showSuccessStatus =  true;
              this.showSuccessMessage = 'Candidate has been deleted successfully';
              this.showErrorStatus =  false;
              this.candidateList = this.candidateList.filter((value) => {
                this.spinner.hide();
                return value.candidateId !== CandidateId;
                
              });

            } else {
              this.spinner.hide();
              this.showSuccessStatus  = false;
              this.showErrorStatus  = true;
              this.showErrorMessage = 'Candidate has not been deleted, can be seen in browser console';
              console.log('Error in creating Question');
            }
          },
          error => {
            this.spinner.hide();
            console.log(error);
          });
  }

}
