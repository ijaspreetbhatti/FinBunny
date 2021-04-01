import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getMetadata() {
    return this.http.get('/api/getmetadata');
  }

  getAllIncomes() {
    return this.http.get('/api/getincomes');
  }

  getAllExpenses() {
    return this.http.get('/api/getexpenses');
  }

  addIncome(income: any) {
    return this.http.post('/api/addincome', income);
  };

  addExpense(income: any) {
    return this.http.post('/api/addexpense', income);
  };

}
