import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {
    recipes: Recipe[] = [
        new Recipe('A Pizza Recipe', 'This is a veg-pizza', 'https://static.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg',
            [new Ingridient('coke', 1),
            new Ingridient('French Fries', 20)]),

        new Recipe('Authentic Indian Food', 'This is a Full-Meal', 'https://s-media-cache-ak0.pinimg.com/originals/e2/bb/56/e2bb563600be307e9e496f5129885f92.jpg',
            [new Ingridient('Curries', 3),
            new Ingridient('Sweets', 2)])
    ];
    constructor(private shoppingListervice: ShoppingListService) { }
    recipesChanged = new Subject<Recipe[]>();

    getRecipe() {
        return this.recipes.slice();
    }
    updateIngridient(id: number, newRecipe: Recipe) {
        this.recipes[id] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    addIngridient(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
    getSingleRecipe(id: number) {
        return this.recipes[id];
    }
    addIngridientsToShoppingList(ingridients: Ingridient[]) {
        this.shoppingListervice.addIngridients(ingridients);
    }


}