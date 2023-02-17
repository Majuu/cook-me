import React, { FunctionComponent, SetStateAction } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../shared/CustomText';
import CustomPicker from '../shared/CustomPicker';
import { textPlaceholders } from '../../consts/text-placeholders.const';
import { ColorsEnum } from '../../enums/colors.enum';
import { FontsEnum } from '../../enums/fonts.enum';
import { useRoute } from '@react-navigation/native';
import CustomInput from '../shared/CustomInput';
import { ScreensEnum } from '../../enums/screens.enum';
import { RecipeCategories } from '../../enums/recipe-categories.enum';

interface RecipeListNavbarProps {
  searchItem: string;
  setSearchItem: SetStateAction<any>;
  setSearchCategory: SetStateAction<any>;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: ColorsEnum.LIGHT_GREEN,
    borderBottomColor: ColorsEnum.GREEN,
    borderBottomWidth: 2,
    height: 135,
  },
  inputDimension: {
    width: '48%',
  },
  contentWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 5,
  },
  header: {
    marginTop: 20,
  },
});

const RecipeListNavbar: FunctionComponent<RecipeListNavbarProps> = ({
  setSearchItem,
  setSearchCategory,
  searchItem,
}: RecipeListNavbarProps) => {
  const route = useRoute();
  const { title, myRecipesTitle } = textPlaceholders.allRecipes;
  const isFavouriteRecipesScreen: boolean =
    route.name === ScreensEnum.MY_RECIPES;
  const recipeCategories: RecipeCategories[] = [
    RecipeCategories.BREAKFAST,
    RecipeCategories.DINNER,
    RecipeCategories.DESSERT,
    RecipeCategories.NONE,
  ];

  return (
    <View style={styles.container}>
      <CustomText
        style={styles.header}
        text={isFavouriteRecipesScreen ? myRecipesTitle : title}
        fontSize={32}
        fontFamily={FontsEnum.SEN_REGULAR}
        color={ColorsEnum.DARK_GREEN}
      />
      <View style={styles.contentWrapper}>
        <CustomInput
          placeholder={'Search'}
          onChange={setSearchItem}
          value={searchItem}
          isSearchBar={true}
          style={styles.inputDimension}
        />
        <CustomPicker
          placeholder={'Filter by...'}
          style={styles.inputDimension}
          list={recipeCategories}
          onChange={setSearchCategory}
        />
      </View>
    </View>
  );
};

export default RecipeListNavbar;
