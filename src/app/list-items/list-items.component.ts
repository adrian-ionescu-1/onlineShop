import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemService} from "../services/item.service";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {
  @Output() changeData = new EventEmitter<any>();// EventEmitter ne ajuta sa transmitem obiecte inafara componentei
  items: Array<any> = [];
  @Input("isAdmin") isAdmin: boolean = false;

  constructor(private itemService: ItemService, private cartService: CartService) {
    this.itemService.getItemList().subscribe((itemsList: Array<any>) => {
      this.items = itemsList; //prin acest subscribe ne asiguram ca vom primi notificari despre lista in timp real
    })

  }

  onEdit(item: any) {
    this.changeData.emit(item);
  }

  onDelete(item: any) {
    console.log(item);
    this.itemService.deleteItem(item);
  }

  onBuy(item: any) {
    this.cartService.addToCart(item);
  }
}
