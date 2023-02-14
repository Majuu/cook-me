import Timer from '../../../../assets/images/app-interaction-icons/clock.svg';
import FavouriteIcon from '../../../../assets/images/app-interaction-icons/favourite.svg';
import NotFavouriteIcon from '../../../../assets/images/app-interaction-icons/not-favourite.svg';
import BreakfastIcon from '../../../../assets/images/recipe-categories-icons/breakfast.svg';
import DinnerIcon from '../../../../assets/images/recipe-categories-icons/dinner.svg';
import DessertIcon from '../../../../assets/images/recipe-categories-icons/dessert.svg';
import {editRecipe} from '../../services/dataApi';
import React, { FunctionComponent, useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ColorsEnum } from "../../enums/colors.enum";
import { FontsEnum } from "../../enums/fonts.enum";
import CustomText from "../shared/CustomText";
import { Recipe } from '../../interfaces/recipe.interface';
import { fetchAllRecipes, fetchFavouriteRecipes } from '../../store/reducers/recipeSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { RecipeCategories } from '../../enums/recipe-categories.enum';

interface RecipeListItemProps {
  onPress: () => void;
  item: Recipe;
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: ColorsEnum.LIGHT_GREEN,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: ColorsEnum.GREEN,
    borderWidth: 2,
  },
  leftMenuWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  descriptionWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  icon: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  clock: {
    marginRight: 5,
  }
});

const RecipesListItem: FunctionComponent<RecipeListItemProps> = ({
  item,
  onPress,
}: RecipeListItemProps) => {
  const titleFontSize: number = 23;
  const subtitleFontSize: number = 17;
  const timeSize: number = 15;
  const {title, category, time, isFavourite, id} = item;
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
  const categoryIconsDimentions = useMemo(() => 70, [])

  const changeIsFavourites = useCallback(async () => {
    await editRecipe({ ...item, isFavourite: !isFavourite }, id as number);
    dispatch(fetchAllRecipes());
    dispatch(fetchFavouriteRecipes());
  }, [item, isFavourite, id]);

  const breakfast = useMemo(() => <BreakfastIcon height={categoryIconsDimentions} width={categoryIconsDimentions} style={styles.icon} />, []);
  const dinner = useMemo(() => <DinnerIcon height={categoryIconsDimentions} width={categoryIconsDimentions} style={styles.icon} />, []);
  const dessert = useMemo(() => <DessertIcon height={categoryIconsDimentions} width={categoryIconsDimentions} style={styles.icon} />, []);

  const generateCategoryIcon = useCallback(() => {
    return category === RecipeCategories.BREAKFAST ? breakfast : 
    category === RecipeCategories.DINNER ? dinner : dessert
  }, [])

  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}>
        <View style={styles.leftMenuWrapper}>
          {generateCategoryIcon()}
          <View style={styles.descriptionWrapper}>
            <CustomText
              color={ColorsEnum.DARK_GREEN}
              fontSize={titleFontSize}
              fontFamily={FontsEnum.SEN_BOLD}
              text={title}
            />
            <CustomText
              color={ColorsEnum.DARK_GREEN}
              fontSize={subtitleFontSize}
              fontFamily={FontsEnum.SEN_REGULAR}
              text={category}
            />
            <View style={styles.timeWrapper}>
              <Timer height={timeSize} width={timeSize} style={styles.clock} />
              <CustomText
                text={time}
                fontSize={timeSize}
                fontFamily={FontsEnum.SEN_REGULAR}
                color={ColorsEnum.DARK_GREEN}
              />
            </View>
          </View>
        </View>
        {isFavourite ? 
        <TouchableOpacity onPress={changeIsFavourites}>
          <FavouriteIcon height={30} width={30}  />
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={changeIsFavourites}>
          <NotFavouriteIcon height={30} width={30} />
        </TouchableOpacity>}
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default RecipesListItem;
