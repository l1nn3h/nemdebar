import {Component} from '@angular/core';
import {CocktailService} from '../../services/cocktail.service';
import {DrinkModel} from '../../models/drink.model';

@Component({
             selector: 'app-drinks',
             templateUrl: './drinks.component.html',
             styleUrls: ['./drinks.component.scss'],
           })
export class DrinksComponent {

  displayedDrinks: DrinkModel[] = [];
  selectedCategory: string = 'limonádé';
  // categories: string[] = ['limonádé', 'cseles limonádé', 'részeges limonádé', 'koktél', 'rövidital'];
  categories: string[] = ['limonádé', 'cseles limonádé', 'részeges limonádé', 'koktél', 'kedvencek'];

  constructor(private service: CocktailService) {
    this.getDrinksByCategory('limonádé');
  }

  getDrinksByCategory(category: string) {
    this.selectedCategory = category;
    this.displayedDrinks = this.service.getDrinksByCategory(this.selectedCategory);
    this.handlePage();
  }

  handlePage() {
    const hamburgerMenu = document.getElementById('navbar-default');
    if (hamburgerMenu != null && !hamburgerMenu.classList.contains('hidden')) {
      const navToggle: HTMLElement | null = document.getElementById('toggle');
      if (navToggle != null) {
        navToggle.click();
      }
    }
    window.scrollTo(0, 0);
  }

  formatIngredients(ingredients: string): string {
    return ingredients.replaceAll(',', '\n');
  }

  changeLikedStatus(drink: DrinkModel) {
    if (drink.liked) {
      this.service.removeDrinkFromFavorites(drink);
    } else {
      this.service.addDrinkToFavorites(drink);
    }
    this.displayedDrinks = this.service.getDrinksByCategory(this.selectedCategory);
  }
}
