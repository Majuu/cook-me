import React, { FunctionComponent } from 'react';
import { Route, StyleSheet, View } from 'react-native';
import CustomButton from '../components/shared/CustomButton';
import CustomText from '../components/shared/CustomText';
import { textPlaceholders } from '../consts/text-placeholders.const';
import { FontsEnum } from '../enums/fonts.enum';
import { ColorsEnum } from '../enums/colors.enum';
import { ScreensEnum } from '../enums/screens.enum';
import { StackActions } from '@react-navigation/native';
import Cake from '../../../assets/images/pie.svg';

interface IntroScreenProps {
  navigation: Route;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: ColorsEnum.LIGHT_GREEN,
    paddingBottom: '15%',
  },
  header: {
    marginTop: 40,
  },
  subheader: {
    margin: 30,
    marginBottom: 0,
  },
});

const IntroScreen: FunctionComponent<IntroScreenProps> = ({
  navigation,
}: IntroScreenProps): React.ReactElement => {
  const navigateToMenuAndRemoveFromStack = () => {
    navigation.dispatch(StackActions.replace(ScreensEnum.MENU));
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomText
          style={styles.header}
          text={textPlaceholders.introScreen.welcomeToMyPastry}
          fontFamily={FontsEnum.SEN_REGULAR}
          fontSize={35}
          color={ColorsEnum.DARK_GREEN}
        />
        <CustomText
          style={styles.subheader}
          text={textPlaceholders.introScreen.subtitle}
          fontFamily={FontsEnum.SEN_REGULAR}
          fontSize={20}
          color={ColorsEnum.DARK_GREEN}
        />
      </View>
      <Cake width={'70%'} height={'40%'} />
      <CustomButton
        text={textPlaceholders.introScreen.letsStart}
        onPress={navigateToMenuAndRemoveFromStack}
      />
    </View>
  );
};

export default IntroScreen;
