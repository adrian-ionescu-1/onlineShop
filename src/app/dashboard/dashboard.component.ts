import {Component} from '@angular/core';
import {AddEditItemComponent} from "./add-edit-item/add-edit-item.component";
import {ListItemsComponent} from "../list-items/list-items.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AddEditItemComponent,
    ListItemsComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  itemData: any;

  constructor(private router: Router) {

  }

  onChangeItem(item: any) {
    console.log("Item a ajuns in dashboard");
    console.log(item);
    //salvam itemul primit in componenta de dashboard
    this.itemData = item;
  }

  onHome() {
    this.router.navigate(['/', 'home']);
  }

  onLogOut() {
    this.router.navigate(['/', 'auth']);
  }
}
