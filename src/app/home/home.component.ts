import {Component} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";
import {ListItemsComponent} from "../list-items/list-items.component";
import {CartButtonComponent} from "./cart-button/cart-button.component";
import {UserService} from "../services/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ListItemsComponent,
    CartButtonComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router, private userService: UserService) {

  }

  isUserAdmin() {
    if (this.userService.getLoggedUser() != null && this.userService.getLoggedUser().userRole == "ADMIN") {

      return true;
    }

    return false;
  }

  onDashboard() {
    this.router.navigate(['/', 'dashboard']);
  }

  onLogOut() {
    this.router.navigate(['/', 'auth']);
  }
}
