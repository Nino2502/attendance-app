import { Component, OnInit } from '@angular/core';

import { Department } from '../../services/department';
import { Role } from '../../services/role';
import { Schedule } from '../../services/schedule';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

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

  nameError = false;
  lastNameError = false;
  emailError = false;
  passwordError = false;

  depError = false;

  roleError = false;

  scheduleError = false;


  selectedDepartment: any = null;
  selectedRole: any = null;
  selectedSchedule: any = null;



  constructor(

    private departmentService: Department,
    private roleService: Role,
    private scheduleService: Schedule,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
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

    if (!this.validateForm()) {
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

          this.toastr.success('Usuario creado correctamente', 'Success');
          console.debug("Usuario Creado", res);

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);

        },
        error: (err) => {

          this.toastr.error('No se pudo crear el usuario', 'Error');

        }
      });


  }

  validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  validateForm(): boolean {

    // resetear errores
    this.nameError = false;
    this.lastNameError = false;
    this.emailError = false;
    this.passwordError = false;
    this.depError = false;
    this.roleError = false;
    this.scheduleError = false;

    let isValid = true;

    if (!this.name || this.name.trim().length < 2) {
      this.nameError = true;
      isValid = false;
    }

    if (!this.lastName || this.lastName.trim().length < 2) {
      this.lastNameError = true;
      isValid = false;
    }

    if (!this.email || !this.validateEmail(this.email)) {
      this.emailError = true;
      isValid = false;
    }

    if (!this.password || this.password.length < 6) {
      this.passwordError = true;
      isValid = false;
    }

    if (this.password !== this.confirmPassword) {
      this.toastr.warning('Las contraseñas no coinciden');
      isValid = false;
    }

    if (!this.selectedDepartment) {
      this.depError = true;
      isValid = false;
    }

    if (!this.selectedRole) {
      this.roleError = true;
      isValid = false;
    }

    if (!this.selectedSchedule) {
      this.scheduleError = true;
      isValid = false;
    }

    return isValid;
  }


}
