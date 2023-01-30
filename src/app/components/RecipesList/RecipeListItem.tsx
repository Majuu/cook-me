// import React, {FunctionComponent, useCallback} from 'react';
// import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
// import CustomText from '../shared/CustomText';
// import {ColorsEnum} from '../../enums/colors.enum';
// import {FontsEnum} from '../../enums/fonts.enum';
import Timer from '../../../../assets/images/app-interaction-icons/clock.svg';
import InactiveStar from '../../../../assets/images/app-interaction-icons/star-empty.svg';
import ActiveStar from '../../../../assets/images/app-interaction-icons/star-active.svg';
// import {RecipeListItem} from '../../interfaces/recipe.interface';
import {editRecipe} from '../../services/dataApi';

import React, { FunctionComponent, useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ColorsEnum } from "../../enums/colors.enum";
import { FontsEnum } from "../../enums/fonts.enum";
import { RecipeListItem } from "../../interfaces/recipe.interface";
import CustomText from "../shared/CustomText";

interface RecipeListItemProps {
  onPress: () => void;
  item: RecipeListItem;
  setAllRecipes: () => void;
  setFavouriteRecipes: () => void;
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
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

const RecipesListItem: FunctionComponent<RecipeListItemProps> = ({
  item,
  onPress,
  setAllRecipes,
  setFavouriteRecipes,
}: RecipeListItemProps) => {
  const titleFontSize: number = 23;
  const subtitleFontSize: number = 17;
  const timeSize: number = 15;
  const {title, category, time, isFavourite, id} = item;

  const changeIsFavourites = useCallback(async () => {
    await editRecipe({ ...item, isFavourite: !isFavourite }, id as number);
    setFavouriteRecipes();
    setAllRecipes();
  }, [item, isFavourite, id]);

  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={onPress}>
        <View style={styles.leftMenuWrapper}>
          <Image source={require('../../../../assets/images/muffin.jpg')} style={styles.icon}/>
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
        {!isFavourite && <InactiveStar height={30} width={30} onPress={changeIsFavourites} />}
        {isFavourite && <ActiveStar height={30} width={30} onPress={changeIsFavourites} />}
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default RecipesListItem;
