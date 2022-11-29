import * as Yup from 'yup';

//ToDO array length of ingredients
export const AddRecipeValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'title')
    .max(30),
  category: Yup.string().oneOf(['all', 'cakes', 'cookies', 'muffins']),
  time: Yup.string().notOneOf(['00:00:00'], 'time error'),
  description: Yup.string()
    .min(1, 'description')
    .max(500),
  authors: Yup.string()
    .min(1, 'authors')
    .max(100),
  ingredients: Yup.array()
});
