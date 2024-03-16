import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;
  private apiUrl: string = "http://localhost:8080/api/customers";
  private userObservable = new BehaviorSubject([]);

  constructor(private httpClient: HttpClient) {
    this.readUsers();
  }

  public setLoggedUser(user: any) {
    this.user = user;
  }

  public getLoggedUser() {

    return this.user;
  }

  getUserList() {

    return this.userObservable.asObservable();
  }

  createUser(user: any) {
    this.httpClient.post(`${this.apiUrl}/addNewCustomer`, user).subscribe((response: any) => {
      console.log(response);
      console.log(response.message);
      this.readUsers();
    })
  }

  updateUser(user: any) {
    this.httpClient.put(`${this.apiUrl}/updateCustomer`, user).subscribe((response: any) => {
      console.log(response);
      console.log(response.message);
      this.readUsers();
    })
  }

  deleteUser(user: any) {
    this.httpClient.delete(`${this.apiUrl}/deleteCustomerById/${user.id}`).subscribe((response: any) => {
      console.log(response);
      this.readUsers();
    })
  }

  readUsers() {
    this.httpClient.get(this.apiUrl).subscribe((response: any) => {
      this.userObservable.next(response.data);
      console.log(response);
    })
  }
}
