export interface RecipeIngredient {
  name: string;
  amount: number;
}

export interface RecipeListItem {
  title: string;
  category: string;
  time: string;
  isFavourite: boolean;
  description: string;
  authors: string;
  ingredients: RecipeIngredient[];
  id?: number;
  // image: string; //check?
}
