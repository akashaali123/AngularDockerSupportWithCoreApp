import { environments } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  getTestResult() {
    return this.http.get<any>(environments.apiUrl + `test/getall`, { })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {

               user.data.result.filter((item) => {

                const event = new Date(item.testDate);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                item["testDate"] = event.toLocaleDateString(undefined, options)

                 return item
                })
            }
          return user;
        }));
  }
  getTestResultByRole() {
    // http://localhost:55377/testresult/getall
    return this.http.get<any>(environments.apiUrl + `testresult/getall`, { })
        .pipe(map(user => {

          if (user.success && user.status === 200) {
            user.data.result.filter((item) => {

              const event = new Date(item.testDate);
              const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              item["testDate"] = event.toLocaleDateString(undefined, options)

               return item
              })
            }
          return user;
        }));
  }
  viewTestResult(candidateId){
    return this.http.get<any>(environments.apiUrl + `test/getbyId?candidateId=${candidateId}`, { })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
              const event = new Date(user.data.result.testDate);
              const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
              user.data.result["testDate"] = event.toLocaleDateString(undefined, options)
            }
          return user;
        }));
  }

  viewTestResultByRole(candidateId) {
    // http://localhost:55377/testresult/getbyid?candidateId=64
    return this.http.get<any>(environments.apiUrl + `testresult/getbyid?candidateId=${candidateId}`, { })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
            const event = new Date(user.data.result.testDate);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            user.data.result["testDate"] = event.toLocaleDateString(undefined, options)
            }
          return user;
        }));
  }
}
