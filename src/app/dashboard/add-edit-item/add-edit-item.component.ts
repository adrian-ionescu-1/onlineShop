import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ItemService} from "../../services/item.service";

@Component({
  selector: 'app-add-edit-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './add-edit-item.component.html',
  styleUrl: './add-edit-item.component.css'
})
export class AddEditItemComponent implements OnChanges {
  @Input("item") item: any;

  id: string = "";
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  imageUrl = new FormControl('', [Validators.required]);

  constructor(private itemService: ItemService) {
  }

  //se apeleaza de fiecare data cand se schimba itemul de sus
  ngOnChanges(changes: SimpleChanges) {
    console.log("Item a ajuns in Add edit component");
    console.log(this.item);
    if (this.item != null) {
      this.id = this.item.id;
      this.title = new FormControl(this.item.name, [Validators.required]);
      this.description = new FormControl(this.item.description, [Validators.required]);
      this.price = new FormControl(this.item.price, [Validators.required]);
      this.imageUrl = new FormControl(this.item.image, [Validators.required]);
    }
  }

  getErrorMessage(input: FormControl): string {
    if (input.hasError('required')) {

      return 'You must enter a value';
    }

    return '';
  }

  onSave(): void {
    let itemData = {
      id: this.id,
      name: this.title.getRawValue()!,
      description: this.description.getRawValue()!,
      price: this.price.getRawValue()!,
      image: this.imageUrl.getRawValue()!,
      category: ""
    };
    console.log(itemData);
    if (itemData.id == "") {
      this.itemService.createItem(itemData);
    } else {
      this.itemService.updateItem(itemData);
    }
    this.resetForm();
  }

  resetForm() {
    this.item = null;
    this.id = "";
    this.title = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [Validators.required]);
    this.imageUrl = new FormControl('', [Validators.required]);
  }
}
