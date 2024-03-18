import {Component, EventEmitter, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  @Output() changeUserData: EventEmitter<any> = new EventEmitter<any>();

  users: Array<any> = [];

  constructor(private userService: UserService) {
    this.userService.getUserList().subscribe((userList: Array<any>) => {
      this.users = userList;
    })
  }

  onEdit(user:any) {
    this.changeUserData.emit(user);
  }

  onDelete(user:any) {
    this.userService.deleteUser(user);
  }
}
