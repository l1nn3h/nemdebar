import {DrinkModel} from './drink.model';

export interface DrinksByCategoryModel {
  category: string;
  drinks: DrinkModel[];
}
