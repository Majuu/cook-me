import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RecipeCategories } from "../enums/recipe-categories.enum";
import { Recipe } from "../interfaces/recipe.interface";
import { RootState } from "../store/store";

export const useRecipeList = (isAllRecipesScreen: boolean, filterByCategory: RecipeCategories | undefined, filterByName: string): Recipe[] => {
    const [currentRecipeList, setCurrentRecipeList ] = useState<Recipe[]>([]);
    const [listFilteredByCategory, setListFilteredByCategory ] = useState<Recipe[]>([]);
    const [listFilteredByCategoryAndName, setListFilteredByCategoryAndName ] = useState<Recipe[]>([]);

    const allRecipes = useSelector((state: RootState) => state.recipes.recipeList);
    const favouriteRecipes = useSelector((state: RootState) => state.recipes.favouritesRecipes);

    useEffect(() => {
        setCurrentRecipeList(isAllRecipesScreen ? allRecipes : favouriteRecipes);
        setListFilteredByCategory(isAllRecipesScreen ? allRecipes : favouriteRecipes);
    }, [isAllRecipesScreen, allRecipes, favouriteRecipes])

    useEffect(() => {
        if(filterByCategory && filterByCategory !== RecipeCategories.NONE) {
            const categoryFilter = currentRecipeList.filter((item) => item.category === filterByCategory);
            setListFilteredByCategory(categoryFilter);
        } else if(filterByCategory === RecipeCategories.NONE) {
            setListFilteredByCategory(currentRecipeList);
        }
    }, [filterByCategory, currentRecipeList])

    useEffect(() => {
        if(filterByName.length) {
            const nameFilter = listFilteredByCategory.filter((item) => {return item.title.toLowerCase().includes(filterByName.toLowerCase())});
            setListFilteredByCategoryAndName(nameFilter);
        } else {
            setListFilteredByCategoryAndName(listFilteredByCategory);
        }
    }, [filterByName, listFilteredByCategory])
    
    return listFilteredByCategoryAndName;
}