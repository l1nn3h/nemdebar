import { Injectable } from '@angular/core';
import {DrinksByCategoryModel} from '../models/drinks-by-category.model';
import drinkList from "../../assets/drinks.json";
import {DrinkModel} from '../models/drink.model';
@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private drinks: DrinksByCategoryModel[] = [];

  constructor() {
    this.drinks = JSON.parse(JSON.stringify(drinkList));
    this.drinks.forEach(d => d.drinks.sort((a, b) => a.name.localeCompare(b.name)));
  }

  getDrinksByCategory(category: string):  DrinkModel[]{
    const requestedDrinks = this.drinks.find(drinks => drinks.category == category);
    return requestedDrinks? requestedDrinks.drinks : [];
  }
}
