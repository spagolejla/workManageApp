import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';




@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  emplyeesTestData: Array<any> = [
    {
      id: '1',
      lastName: 'Test',
      firstName: "Employee 1",
      position: "Software Developer",
      shortDescription: "Software Developer",
      salaryPerHour: 100,
      active: true,
      picture: "no-picture.png"
    },
    {
      id: '2',
      lastName: 'Test',
      firstName: "Employee 2",
      shortDescription: "Experienced software developer with more than 3 years of experience in web development",
      position: "Software Developer",
      salaryPerHour: 100,
      startWorkDate: new Date,
      active: true,
      picture: "default-avatar.webp"
    },
    {
      id: '3',
      lastName: 'Test',
      firstName: "Employee 2",
      position: "Software Developer",
      shortDescription: "Software Developer",
      salaryPerHour: 100,
      active: true,
      picture: "default-avatar.webp"
    },
    {
      id: '4',
      lastName: 'Test',
      firstName: "Employee 2",
      position: "Software Developer",
      shortDescription: "Software Developer",
      salaryPerHour: 100,
      active: true,
      picture: "no-picture.png"
    },
    {
      id: '5',
      lastName: 'Test',
      firstName: "Employee 2",
      position: "Software Developer",
      shortDescription: "Software Developer",
      salaryPerHour: 100,
      active: true,
      picture: "no-picture.png"
    },
    {
      id: '6',
      lastName: 'Test',
      firstName: "Employee 6",
      position: "Software Developer",
      shortDescription: "Software Developer",
      salaryPerHour: 100,
      active: true,
      picture: "no-picture.png",
      avatarUrl: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
    },
  ];
  URL: string = 'ticket/v1/employee/';
  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Array<Employee>> {

    return of(this.emplyeesTestData);
  }

  deleteEmployee(id: string): Observable<boolean> {
    this.emplyeesTestData = Object.assign([], this.emplyeesTestData);
    let index = this.emplyeesTestData.findIndex(x => x.id == id);
    this.emplyeesTestData.splice(index, 1);
    return of(true);
    // return this.httpClient.delete(this.URL + id)
    //   .pipe(map(() => { return true; }));
  }

  createEmployee(employee: Employee): Observable<Employee> {
    console.log(employee)
    // var id = (emplyeesTestData.length + 1).toString();
    // let newEmployee = {
    //   ...employee,
    //   id
    // }

    this.emplyeesTestData = Object.assign([], this.emplyeesTestData);
    this.emplyeesTestData.push(employee);
    return of(employee);
    // return this.httpClient.post(this.URL, employee, { observe: 'response' })
    //   .pipe(map((response: any) => {
    //     return response.body;
    //   }));
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    this.emplyeesTestData = Object.assign([], this.emplyeesTestData);

    const index = this.emplyeesTestData.findIndex(object => {
      return object.id === employee.id;
    }); //  1
    
    if (index !== -1) {
      this.emplyeesTestData[index] = employee;
    }

    return of(employee);
    // return this.httpClient.put(this.URL, employee)
    //   .pipe(map((response: any) => { return response; }));
  }

}
