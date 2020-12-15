import { DashboardService } from './../../../../Services/Dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.css']
})
export class DashboardAnalyticsComponent implements OnInit {
  candidateCount = 0;
  failCount = 0;
  passCount = 0;
  questionCount = 0;
  testCount = 0;
  userCount = 0;
  topTenCandidates = [];


  constructor(private dashboardService: DashboardService,
              private spinner : NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.dashboardService.getCandidateCount()
      .pipe(first())
      .subscribe(
      data => {
        this.candidateCount =  data.data.count;
      },
      error => {
        this.candidateCount = 0;
      });


    this.dashboardService.getFailCandidatesCount()
      .pipe(first())
      .subscribe(
      data => {
        this.failCount =  data.data.count;
      },
      error => {
        this.failCount = 0;
      });


    this.dashboardService.getPassCandidatesCount()
      .pipe(first())
      .subscribe(
      data => {
        this.passCount =  data.data.count;
      },
      error => {
        this.passCount = 0;
      });


    this.dashboardService.getQuestionCount()
      .pipe(first())
      .subscribe(
      data => {
        this.questionCount =  data.data.count;
      },
      error => {
        this.questionCount = 0;
      });


    this.dashboardService.getTestCount()
      .pipe(first())
      .subscribe(
      data => {
        this.testCount =  data.data.count;
      },
      error => {
        this.testCount = 0;
      });


    this.dashboardService.getUserCount()
      .pipe(first())
      .subscribe(
      data => {
        this.userCount =  data.data.count;
      },
      error => {
        this.userCount = 0;
      });

    this.dashboardService.getTopTenCandidates()
    .pipe(first())
    .subscribe(
    data => {
      this.topTenCandidates =  data.data.result;
    },
    error => {
      this.topTenCandidates = [];
    });
this.spinner.hide();
    }

}
