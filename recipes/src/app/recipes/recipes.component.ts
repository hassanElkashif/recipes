import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  imports: [CommonModule,RouterModule]
})

export class RecipesComponent implements OnInit {
  // variables for later use 
  meals: any[] = []; 
  categoryMealIds: any[] = []; 
  selectedCategory: string = 'All'; 


  constructor(private recipesService: RecipesService) {}

  //default starting point
  ngOnInit(): void {
    this.getMealsByCategory('chicken'); 
  }
  
  //function to get meals by category
  getMealsByCategory(category: string) {
    this.selectedCategory = category;
    console.log('Fetching meals for:', category);
    this.recipesService.getMealsByCategory(category).subscribe({
      next: (data: { meals: any[]; }) => {
        const mealIds = data.meals.map((meal: any) => meal.idMeal);
        this.categoryMealIds = [...mealIds];
        this.getMealDetails(this.categoryMealIds);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  

  //function to get meal details by it's own id
  getMealDetails(categoryMealIds: any[]) {
    if (Array.isArray(categoryMealIds)) {
      this.meals = []; 
      categoryMealIds.forEach(mealId => {
        this.recipesService.getMealDetails(mealId).subscribe({
          next: (data: { meals: any[]; }) => {
            if (data.meals && data.meals.length > 0) {
              this.meals.push(data.meals[0]); 
            }
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      });
    } else {
      console.log(Error);
    }
  }


}  



