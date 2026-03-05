import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import axios from 'axios';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {

  email: string = '';

  password: string = '';

  emailError = false;

  passError = false;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  async login() {

    try {

      if (!this.email && !this.password) {
        this.emailError = true;
        this.passError = true;
        return;
      }

      if (!this.email) {
        this.emailError = true;
        return;
      }

      if (!this.password) {
        this.passError = true;
        return;
      }


      const response = await axios.post(
        'http://localhost:8080/api/users/login',
        {
          email: this.email,
          password: this.password
        }
      );

      // Guardar usuario en memoria local (temporal)
      localStorage.setItem('user', JSON.stringify(response.data));

      this.toastr.success("Inicio de sesión exitosó");

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);

    } catch (error: any) {

      if (error.response?.status === 401) {
        this.toastr.warning('El usuario no existe en el sistema');
      } else {
        alert('Error de conexión con el servidor');
      }

    }
  }

}
