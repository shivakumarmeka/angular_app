import { Params, ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from "app/recipes/recipe.service";
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEdit = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEdit = params['id'] != null;
      this.initForm();
    });
  }
  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngridients = new FormArray([]);
    if (this.isEdit) {
      const recipe = this.recipeService.getSingleRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingridients']) {
        for (let ingridient of recipe.ingridients) {
          recipeIngridients.push(
            new FormGroup({
              'name': new FormControl(ingridient.name, Validators.required),
              'amount': new FormControl(ingridient.amount, Validators.required)
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingridients': recipeIngridients
    });
  }
  onAddIngridient() {
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      })
    );
  }
  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isEdit) {
      this.recipeService.updateIngridient(this.id, newRecipe)
    } else {
      this.recipeService.addIngridient(newRecipe);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  handleCancelClick() {
    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onRemoveIngridient(id: number) {
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(id);
  }
}
