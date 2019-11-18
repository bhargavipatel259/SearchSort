import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Sort } from '@angular/material/sort';

export interface Employee {
  id: number;
  employee_name: string;
  employee_salary: number;
  employee_age: number;
  profile_image: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchText;
  expression = true;
  employees: Employee[] = [];
  reveal() {
    this.expression = false;
    this.authService.getDetails().subscribe((data: []) => {
      console.log("data", data);
      this.employees = data;
      console.log("data", this.employees);
    });
    this.sortedData = this.employees.slice();
  }

  sortedData: Employee[];

  constructor(private authService: AuthService) {}

  sortData(sort: Sort) {
    const data = this.employees.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "id":
          return compare(a.id, b.id, isAsc);
        case "employee_name":
          return compare(a.employee_name, b.employee_name, isAsc);
        case "employee_salary":
          return compare(a.employee_salary, b.employee_salary, isAsc);
        case "employee_age":
          return compare(a.employee_age, b.employee_age, isAsc);
        case "profile_image":
          return compare(a.profile_image, b.profile_image, isAsc);
        default:
          return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
