export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeListItem {
  title: string;
  category: string;
  time: string;
  isFavourite: boolean;
  description: string;
  authors: string;
  ingredients: Ingredient[];
  id?: number;
  // image: string; //check?
}
