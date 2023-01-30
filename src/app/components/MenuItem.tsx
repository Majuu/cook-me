import React, { FunctionComponent, useCallback } from 'react';
import { Route, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from './shared/CustomText';
import { FontsEnum } from '../enums/fonts.enum';
import { ColorsEnum } from '../enums/colors.enum';
import { ScreensEnum } from '../enums/screens.enum';

interface MenuItemProps {
  navigation: Route;
  screenToNavigate: ScreensEnum;
  title: string;
  image: HTMLElement;
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    backgroundColor: ColorsEnum.GREEN,
    margin: 10,
    padding: 20
  }
});

const MenuItem: FunctionComponent<MenuItemProps> = ({ navigation, title, image, screenToNavigate }: MenuItemProps): React.ReactElement => {
  const textFontSize = 35;

  const navigateToScreen = useCallback(() => {
    navigation.navigate(screenToNavigate, { isMyRecipes: screenToNavigate === ScreensEnum.MY_RECIPES });
  }, []);

  return (
    <TouchableOpacity style={styles.listItem} onPress={navigateToScreen}>
      <>
      <CustomText text={title} fontSize={textFontSize} fontFamily={FontsEnum.SEN_BOLD} color={ColorsEnum.DARK_GREEN} />
      {image}
      </>
    </TouchableOpacity>
  );
};

export default MenuItem;
