import * as Yup from 'yup';
import { RecipeCategories } from '../enums/recipe-categories.enum';

//ToDO array length of ingredients
export const AddRecipeValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'title')
    .max(30),
  category: Yup.string().oneOf([RecipeCategories.BREAKFAST, RecipeCategories.DINNER, RecipeCategories.DESSERT]),
  time: Yup.string().notOneOf(['00:00:00'], 'time error'),
  description: Yup.string()
    .min(1, 'description')
    .max(500),
  authors: Yup.string()
    .min(1, 'authors')
    .max(100),
  ingredients: Yup.array()
});
