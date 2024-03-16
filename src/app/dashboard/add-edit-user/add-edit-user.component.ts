import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-add-edit-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent implements OnChanges {
  @Input("user") user: any;

  id: string = "";
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  userRole = new FormControl('', [Validators.required]);

  constructor(private userService: UserService) {
  }

  //se apeleaza de fiecare data cand se schimba itemul de sus
  ngOnChanges(changes: SimpleChanges) {
    console.log("User a ajuns in Add edit component");
    console.log(this.user);
    if (this.user != null) {
      this.id = this.user.id;
      this.name = new FormControl(this.user.name, [Validators.required]);
      this.email = new FormControl(this.user.email, [Validators.required]);
      this.address = new FormControl(this.user.address, [Validators.required]);
      this.password = new FormControl(this.user.password, [Validators.required]);
      this.phone = new FormControl(this.user.phone, [Validators.required]);
      this.userRole = new FormControl(this.user.userRole, [Validators.required]);
    }
  }

  getErrorMessage(input: FormControl): string {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onSave(): void {
    let userData = {
      id: this.id,
      name: this.name.getRawValue()!,
      email: this.email.getRawValue()!,
      address: this.address.getRawValue()!,
      password: this.password.getRawValue()!,
      phone: this.phone.getRawValue()!,
      userRole: this.userRole.getRawValue()!
    };
    console.log(userData);
    if (userData.id == "") {
      this.userService.createUser(userData);
    } else {
      this.userService.updateUser(userData);
    }
    this.resetForm();
  }

  resetForm() {
    this.user = null;
    this.id = "";
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.address = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.userRole = new FormControl('', [Validators.required]);
  }
}
