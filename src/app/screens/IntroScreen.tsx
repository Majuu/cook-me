import React, {FunctionComponent} from 'react';
import {Route, StyleSheet, View} from 'react-native';
import CustomButton from '../components/shared/CustomButton';
import CustomText from '../components/shared/CustomText';
import {textPlaceholders} from '../consts/text-placeholders.const';
import {FontsEnum} from '../enums/fonts.enum';
import {ColorsEnum} from '../enums/colors.enum';
import {ScreensEnum} from '../enums/screens.enum';
// import Cake from '../../../assets/images/pie.svg';
import FullScreenContainer from '../components/FullScreenContainer';

interface IntroScreenProps {
  navigation: Route;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorsEnum.LIGHT_GREEN,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: 40,
  },
  subheader: {
    margin: 30,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 60,
  },
  cakeImage: {
    marginTop: 20,
  },
});

const IntroScreen: FunctionComponent<IntroScreenProps> = ({
  navigation,
}: IntroScreenProps): React.ReactElement => {
  // const imageDimensions = 240;

  return (
    <FullScreenContainer>
      <View style={styles.container}>
        <CustomText
          style={styles.header}
          text={textPlaceholders.introScreen.welcomeToMyPastry}
          fontFamily={FontsEnum.SEN_BOLD}
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
        {/* <Cake
          width={imageDimensions}
          height={imageDimensions}
          style={styles.cakeImage}
        /> */}
        <CustomButton
          style={styles.button}
          text={textPlaceholders.introScreen.letsStart}
          onPress={(): void => navigation.navigate(ScreensEnum.MENU)}
        />
      </View>
    </FullScreenContainer>
  );
};

export default IntroScreen;
