import {Injectable} from '@angular/core';
import {DrinksByCategoryModel} from '../models/drinks-by-category.model';
import drinkList from '../../assets/drinks.json';
import {DrinkModel} from '../models/drink.model';

@Injectable({
              providedIn: 'root',
            })
export class CocktailService {

  private drinks: DrinksByCategoryModel[] = [];

  constructor() {
    this.drinks = JSON.parse(JSON.stringify(drinkList));
    this.addFavoriteCategory();
    this.drinks.flatMap(dc => dc.drinks).forEach(d => d.imageShowing = true);
    this.drinks.forEach(d => d.drinks.sort((a, b) => a.name.localeCompare(b.name)));
  }

  getDrinksByCategory(category: string): DrinkModel[] {
    const drinksByCategory = this.drinks.find(dbc => dbc.category == category);
    return drinksByCategory ? drinksByCategory.drinks : [];
  }

  removeDrinkFromFavorites(drinkToBeRemoved: DrinkModel): void {
    const favorites = this.getFavoriteDrinkNames();
    if (favorites.includes(drinkToBeRemoved.name)) {
      localStorage.setItem('favoriteDrinks', JSON.stringify(favorites.filter(s => s !== drinkToBeRemoved.name)));
      const drinkFromList = this.drinks
                                   .filter(d => d.category != "kedvencek")
                                   .flatMap(d => d.drinks)
                                   .find(d=> d.name === drinkToBeRemoved.name);
      if (drinkFromList) {
        drinkFromList.liked = false;
        const favoriteDrinkCategory = this.drinks.find(c => c.category === 'kedvencek')
        if (favoriteDrinkCategory) {
          const index = favoriteDrinkCategory.drinks.findIndex(d => d.name === drinkToBeRemoved.name);
          favoriteDrinkCategory.drinks.splice(index, 1);
        }
      }
    }
  }

  addDrinkToFavorites(drink: DrinkModel): void {
    const favorites = this.getFavoriteDrinkNames();
    favorites.push(drink.name);
    const drinkInDrinkList = this.drinks.flatMap(d => d.drinks).find(d=> d.name === drink.name);
    if (drinkInDrinkList) {
      drinkInDrinkList.liked = true;
      this.drinks.find(c => c.category === 'kedvencek')?.drinks.push(drinkInDrinkList);
    }
    this.drinks.forEach(d => d.drinks.sort((a, b) => a.name.localeCompare(b.name)));
    localStorage.setItem('favoriteDrinks', JSON.stringify(favorites));
  }

  private getFavoriteDrinkNames(): string[] {
    const data = localStorage?.getItem('favoriteDrinks');
    return data
           ? JSON.parse(data)
           : [];
  }

  private addFavoriteCategory(): void {
    const favorites = this.getFavoriteDrinkNames();
    const favoriteCategory: DrinksByCategoryModel = {
      category: "kedvencek",
      drinks: []
    }
    for (let drinkName of favorites) {
      const drink = this.drinks
                        .flatMap(dbc => dbc.drinks)
                        .filter(d => drinkName === d.name)[0];
      drink.liked = true;
      favoriteCategory.drinks.push(drink);
    }
    this.drinks.push(favoriteCategory);
  }

}
