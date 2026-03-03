import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {


  email: string = '';

  password: string = '';


  constructor(private router: Router) { }

  async login() {

    try {

      const response = await axios.post(
        'http://localhost:8080/api/users/login',
        {
          email: this.email,
          password: this.password
        }
      );

      console.log('Respuesta backend:', response.data);

      // Guardar usuario en memoria local (temporal)
      localStorage.setItem('user', JSON.stringify(response.data));

      this.router.navigate(['/home']);

    } catch (error: any) {

      if (error.response?.status === 401) {
        alert('Credenciales incorrectas');
      } else {
        alert('Error de conexión con el servidor');
      }

      console.error('Error login:', error);

    }
  }



}
