import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL: string = `${environment.apiUrl}/employee`;
  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Array<Employee>> {
    return this.httpClient.get<Array<Employee>>(this.URL);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post(this.URL, employee, { observe: 'response' })
      .pipe(map((response: any) => {
        return response.body;
      }));
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put(this.URL, employee)
      .pipe(map((response: any) => { return response; }));
  }

  deleteEmployee(id: string): Observable<boolean> {
    return this.httpClient.delete(this.URL + '/' + id)
      .pipe(map(() => { return true; }));
  }

}
