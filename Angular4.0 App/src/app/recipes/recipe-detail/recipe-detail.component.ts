import { Router, Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.
      subscribe((params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getSingleRecipe(this.id);
      });
  }
  onAddToShoppingList() {
    this.recipeService.addIngridientsToShoppingList(this.recipe.ingridients);
  }
  handleEditClicked() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  handleDeleteClicked() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
