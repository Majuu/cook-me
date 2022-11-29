import React, {FunctionComponent, useEffect} from 'react';
import {FlatList, Route, StyleSheet, Text, View} from 'react-native';
import FullScreenContainer from '../components/FullScreenContainer';
import {textPlaceholders} from '../consts/text-placeholders.const';
// import Learn from '../../../assets/images/mold.svg';
// import Menu from '../../../assets/images/menu.svg';
// import Chef from '../../../assets/images/chef.svg';
// import Cooking from '../../../assets/images/cooking.svg';
import {ScreensEnum} from '../enums/screens.enum';
import MenuItem from '../components/MenuItem';
import {ColorsEnum} from '../enums/colors.enum';

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
  // const imgDimensions = 80;
  const data: MenuItemListInterface[] = [
    // {
    //   id: 'learn',
    //   title: textPlaceholders.menuScreen.learn,
    //   image: <Learn width={imgDimensions} height={imgDimensions} />,
    //   screenToNavigate: ScreensEnum.LEARN_BASICS
    // },
    // {
    //   id: 'myList',
    //   title: textPlaceholders.menuScreen.myList,
    //   image: <Chef width={imgDimensions} height={imgDimensions} />,
    //   screenToNavigate: ScreensEnum.MY_RECIPES
    // },
    // {
    //   id: 'list',
    //   title: textPlaceholders.menuScreen.list,
    //   image: <Menu width={imgDimensions} height={imgDimensions} />,
    //   screenToNavigate: ScreensEnum.RECIPE_LIST
    // },
    // {
    //   id: 'add',
    //   title: textPlaceholders.menuScreen.addRecipe,
    //   image: <Cooking width={imgDimensions} height={imgDimensions} />,
    //   screenToNavigate: ScreensEnum.ADD_RECIPE
    // }
    {
      id: 'learn',
      title: textPlaceholders.menuScreen.learn,
      image: <Text>image</Text>,
      screenToNavigate: ScreensEnum.LEARN_BASICS,
    },
    {
      id: 'myList',
      title: textPlaceholders.menuScreen.myList,
      image: <Text>image</Text>,
      screenToNavigate: ScreensEnum.MY_RECIPES,
    },
    {
      id: 'list',
      title: textPlaceholders.menuScreen.list,
      image: <Text>image</Text>,
      screenToNavigate: ScreensEnum.RECIPE_LIST,
    },
    {
      id: 'add',
      title: textPlaceholders.menuScreen.addRecipe,
      image: <Text>image</Text>,
      screenToNavigate: ScreensEnum.ADD_RECIPE,
    },
  ];

  useEffect(() => {}, []);

  return (
    <FullScreenContainer>
      <View style={styles.container}>
        <View>
          <FlatList
            data={data}
            renderItem={({item}): React.ReactElement => (
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
    </FullScreenContainer>
  );
};

export default MenuScreen;
