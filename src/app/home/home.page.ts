import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  peopleOutline,
  personOutline,
  walkOutline,
  calendarOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';

import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(private router: Router, private menu: MenuController) {
    addIcons({
      homeOutline,
      peopleOutline,
      personOutline,
      walkOutline,
      calendarOutline
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }
  
  navigateAndClose() {
    this.menu.close();
  }

  closeMenu() {
    this.menu.close();
  }


}
