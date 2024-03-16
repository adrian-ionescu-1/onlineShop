import {Component} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    MatIconModule
  ],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent {
  orders: Array<any> = [{
    "id": 1,
    "date": "2024-04-21",
    "total": 147.32,
    "quantity": 4,
    "status": "pending",
    "customer": {
      "id": 1,
      "name": "PAul",
      "address": "Aviatorilor nr.14",
      "email": "paul@gmail.com",
      "password": null,
      "phone": "+40745324231",
      "userRole": null
    },
    "itemList": [
      {
        "id": 1,
        "name": "Book4",
        "description": "Autor3",
        "price": 244.25,
        "image": "https://cdn.icon-icons.com/icons2/2072/PNG/512/bug_danger_data_internet_malware_security_virus_icon_127084.png",
        "category": ""
      }
    ]
  },
    {
      "id": 2,
      "date": "2024-04-21",
      "total": 147.32,
      "quantity": 4,
      "status": "pending",
      "customer": {
        "id": 1,
        "name": "PAul",
        "address": "Aviatorilor nr.14",
        "email": "paul@gmail.com",
        "password": null,
        "phone": "+40745324231",
        "userRole": null
      },
      "itemList": [
        {
          "id": 1,
          "name": "Book4",
          "description": "Autor3",
          "price": 244.25,
          "image": "https://cdn.icon-icons.com/icons2/2072/PNG/512/bug_danger_data_internet_malware_security_virus_icon_127084.png",
          "category": ""
        }
      ]
    }];

  constructor(private cartService: CartService) {
    this.cartService.getAllCartsFromServer().subscribe((orderList: Array<any>) => {
      this.orders = orderList;
    })
  }

  onDelete(order: any) {
    this.cartService.deleteCart(order.id);
  }
}
