import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl: string = "";
  private cartObservable = new BehaviorSubject<Array<any>>([]);
  private allCartsObservable = new BehaviorSubject(<Array<any>>([]));

  constructor(private httpClient: HttpClient) {
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
    let body = {
      // userId: this.userService.getUser().id,
      items: this.cartObservable.getValue()
    }

    this.httpClient.post(`${this.apiUrl}/carts/`, body).subscribe((response: any) => {
      console.log(response)
      this.cartObservable.next([]);
    })
  }

  public deleteCart(id: string) {
    this.httpClient.delete(`${this.apiUrl}/carts/${id}`).subscribe((response: any) => {
      console.log(response);
      this.readAllCarts()
    })
  }

  public readAllCarts() {
    return this.httpClient.get(`${this.apiUrl}/carts/`).subscribe((response: any) => {
      this.allCartsObservable.next(response.data)
    });
  }
}
