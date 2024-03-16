import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl: string = "http://localhost:8080/api/orders";
  private cartObservable = new BehaviorSubject<Array<any>>([]);
  private allCartsObservable = new BehaviorSubject(<Array<any>>([]));

  constructor(private httpClient: HttpClient, private userService: UserService) {
    this.readAllCarts();
  }

  public addToCart(item: any): void {
    let items = this.cartObservable.getValue();
    items.push(item);
    this.cartObservable.next(items);
  }

  public removeFromCart(item: any): void {
    let items = this.cartObservable.getValue();

    items = items.filter((it: any) => it.id != item.id);
    this.cartObservable.next(items);
  }

  public getCart() {

    return this.cartObservable.asObservable()
  }

  public getAllCartsFromServer() {

    return this.allCartsObservable.asObservable();
  }

  public createCart() {

    // pregatim lista de id-uri ale produselor
    let itemList: Array<any> = [];
    let itemsFromCart = this.cartObservable.getValue();
    for (let item of itemsFromCart) {
      itemList.push({"id": item.id});
    }

    // setam id-ul customerului
    let customer = {"id": this.userService.getLoggedUser().id}

    // calculam pretul total al produselor
    let total: number = 0;
    for (let item of itemsFromCart) {
      total = total + item.price;
    }

    // pregatim body-ul pt request
    let body = {
      "date": this.parseDate(),
      "total": total,
      "quantity": itemsFromCart.length,
      "status": "pending",
      "customer": customer,
      "itemList": itemList
    };
    console.log(body);

    this.httpClient.post(`${this.apiUrl}/addNewOrder`, body).subscribe((response: any) => {
      console.log(response)
      this.cartObservable.next([]);
      this.readAllCarts();
    })
  }

  public deleteCart(id: string) {
    this.httpClient.delete(`${this.apiUrl}/deleteOrderById/${id}`).subscribe((response: any) => {
      console.log(response);
      this.readAllCarts()
    })
  }

  public readAllCarts() {

    return this.httpClient.get(`${this.apiUrl}`).subscribe((response: any) => {
      this.allCartsObservable.next(response.data)
    });
  }

  private parseDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dateStr = "";

    dateStr += year;
    dateStr += "-";

    if (month < 10) {
      dateStr += "0" + month;
    } else {
      dateStr += month;
    }
    dateStr += "-";

    if (day < 10) {
      dateStr += "0" + day;
    } else {
      dateStr += day;
    }
    console.log(dateStr);
    return dateStr;
  }
}
