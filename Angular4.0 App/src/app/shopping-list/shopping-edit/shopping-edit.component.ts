import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingridient } from '../../shared/ingridient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedIndexNumber: number;
  editedItem: Ingridient;
  @ViewChild('f') slForm: NgForm;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.editItems.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editedIndexNumber = id;
        this.editedItem = this.shoppingListService.getIngridient(id);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngridient = new Ingridient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.upgradeIngridient(this.editedIndexNumber, newIngridient);
    } else {
      this.shoppingListService.addIngridient(newIngridient);
    }
    this.editMode = false;
    this.slForm.reset();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  handleClearClick() {
    this.slForm.reset();
    this.editMode = false;
  }
  handleDeleteClick() {
    this.shoppingListService.removeIngridient(this.editedIndexNumber);
    this.handleClearClick();
  }

}
