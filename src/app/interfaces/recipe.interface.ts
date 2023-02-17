import { IngredientUnit } from '../enums/ingredient-units.enum';

export interface Ingredient {
  name: string;
  amount: number;
  unit: IngredientUnit;
}

export interface Recipe {
  title: string;
  category: string;
  time: string;
  isFavourite: boolean;
  description: Array<string>;
  authors: string;
  ingredients: Ingredient[];
  id?: number;
}
