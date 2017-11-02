import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.ingridientSubscription.unsubscribe();
  }

  ingridients: Ingridient[];
  private ingridientSubscription: Subscription;
  constructor(private shoppingListService: ShoppingListService) { }

  handleEditClicked(index: number) {
    this.shoppingListService.editItems.next(index);
  }

  ngOnInit() {
    this.ingridients = this.shoppingListService.getIngridients();
    this.ingridientSubscription = this.shoppingListService.ingridientsChanged.subscribe(
      (ingridients: Ingridient[]) => {
        this.ingridients = ingridients;
      }
    );
  }
}
