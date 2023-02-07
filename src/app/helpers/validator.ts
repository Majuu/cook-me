import * as Yup from 'yup';
import { RecipeCategories } from '../enums/recipe-categories.enum';

export const AddRecipeValidationSchema = Yup.object().shape({
  title: Yup.string().max(50).required(),
  category: Yup.string().oneOf([RecipeCategories.BREAKFAST, RecipeCategories.DINNER, RecipeCategories.DESSERT]),
  time: Yup.string().notOneOf(['00:00:00']),
  description: Yup.array().min(1),
  authors: Yup.string()
    .max(50)
    .required(),
  ingredients: Yup.array().min(1)
});

export const AddIngredientValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(),
  amount: Yup.string()
  .required(),
  unit: Yup.string()
  .required()
})
