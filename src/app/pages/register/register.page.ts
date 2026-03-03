import { Component, OnInit } from '@angular/core';

import { Department } from '../../services/department';
import { Role } from '../../services/role';
import { Schedule } from '../../services/schedule';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {


  departments: any[] = [];

  roles: any[] = [];

  schedules: any[] = [];
  employeeCode: any[] = [];
  name: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  selectedDepartment: any = null;
  selectedRole: any = null;
  selectedSchedule: any = null;



  constructor(

    private departmentService: Department,
    private roleService: Role,
    private scheduleService: Schedule,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {

    this.loadData();

  }


  loadData() {

    this.departmentService.getAll().subscribe(data => {
      this.departments = data;
    });

    this.roleService.getAll().subscribe(data => {
      this.roles = data;
    });

    this.scheduleService.getAll().subscribe(data => {
      this.schedules = data;
    });

  }



  register() {

    if (this.password !== this.confirmPassword) {
      console.debug("Las constraseñas no coinciden");
      return;
    }

    const payload = {
      employeeCode: 'EMP' + Date.now(),
      firstName: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      active: true,
      departamentoId: {
        id: this.selectedDepartment
      },
      role: {
        id: this.selectedRole
      },
      schedule: {
        id: this.selectedSchedule
      }

    };
    console.log('Payload:', JSON.stringify(payload, null, 2));


    this.http.post('http://localhost:8080/api/users', payload)
      .subscribe({
        next: (res) => {
          console.debug("Usuario Creado", res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error Creado usuario', err);
        }
      });


  }


}
