import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../shared/CustomText';
import CustomPicker from '../shared/CustomPicker';
import { textPlaceholders } from '../../consts/text-placeholders.const';
import { ColorsEnum } from '../../enums/colors.enum';
import { FontsEnum } from '../../enums/fonts.enum';
import { useRoute } from '@react-navigation/native';
import CustomInput from '../shared/CustomInput';
import { ScreensEnum } from '../../enums/screens.enum';

interface RecipeListNavbarProps {
  searchItem: string;
  setSearchItem: any;
  searchCategory: string;
  setSearchCategory: any;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: ColorsEnum.LIGHT_GREEN,
    borderBottomColor: ColorsEnum.GREEN,
    borderBottomWidth: 2,
    height: 135
  },
  picker: {
    width: '45%'
  },
  contentWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 5
  },
  header: {
    marginTop: 20
  }
});

const RecipeListNavbar: FunctionComponent<RecipeListNavbarProps> = ({
  setSearchItem,
  setSearchCategory,
  searchCategory,
  searchItem
}: RecipeListNavbarProps) => {
  const route = useRoute();
  const { title, myRecipesTitle } = textPlaceholders.allRecipes;
  // @ts-ignore
  // const isFavouriteRecipesScreen: boolean = route.params && route.params.isMyRecipes;
  const isFavouriteRecipesScreen: boolean = route.name === ScreensEnum.MY_RECIPES;

  return (
    <View style={styles.container}>
      <CustomText
        style={styles.header}
        text={isFavouriteRecipesScreen ? myRecipesTitle : title}
        fontSize={32}
        fontFamily={FontsEnum.SEN_BOLD}
        color={ColorsEnum.DARK_GREEN}
      />
      <View style={styles.contentWrapper}>
        <CustomInput placeholder={'Search'} onChange={setSearchItem} value={searchItem} isSearchBar={true} style={styles.picker} />
        {/* pastry categories was in list previously */}
        {/* <CustomPicker list={[]} onChange={setSearchCategory} style={styles.picker} value={} /> */}
      </View>
    </View>
  );
};

export default RecipeListNavbar;
