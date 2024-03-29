import React, { FunctionComponent, useMemo } from 'react';
import { FlatList, Route, StyleSheet, View } from 'react-native';
import { textPlaceholders } from '../consts/text-placeholders.const';
import Learn from '../../../assets/images/mold.svg';
import Menu from '../../../assets/images/menu.svg';
import Chef from '../../../assets/images/chef.svg';
import Cooking from '../../../assets/images/cooking.svg';
import { ScreensEnum } from '../enums/screens.enum';
import MenuItem from '../components/MenuItem';
import { ColorsEnum } from '../enums/colors.enum';

interface MenuItemListInterface {
  id: string;
  title: string;
  image: HTMLElement;
  screenToNavigate: ScreensEnum;
}

interface MenuScreenProps {
  navigation: Route;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: ColorsEnum.LIGHT_GREEN,
  },
});

const MenuScreen: FunctionComponent<MenuScreenProps> = ({
  navigation,
}: MenuScreenProps): React.ReactElement => {
  const data: MenuItemListInterface[] = useMemo(
    () => [
      {
        id: 'learn',
        title: textPlaceholders.menuScreen.learn,
        image: <Learn width={'20%'} height={'150%'} />,
        screenToNavigate: ScreensEnum.LEARN_BASICS,
      },
      {
        id: 'list',
        title: textPlaceholders.menuScreen.list,
        image: <Menu width={'20%'} height={'150%'} />,
        screenToNavigate: ScreensEnum.RECIPE_LIST,
      },
      {
        id: 'myList',
        title: textPlaceholders.menuScreen.myList,
        image: <Chef width={'20%'} height={'150%'} />,
        screenToNavigate: ScreensEnum.MY_RECIPES,
      },
      {
        id: 'add',
        title: textPlaceholders.menuScreen.addRecipe,
        image: <Cooking width={'20%'} height={'150%'} />,
        screenToNavigate: ScreensEnum.ADD_RECIPE,
      },
    ],
    [textPlaceholders, ScreensEnum],
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          scrollEnabled={false}
          renderItem={({ item }): React.ReactElement => (
            <MenuItem
              screenToNavigate={item.screenToNavigate}
              title={item.title}
              image={item.image}
              navigation={navigation}
            />
          )}
          keyExtractor={(item: MenuItemListInterface): string => item.id}
        />
      </View>
    </View>
  );
};

export default MenuScreen;
