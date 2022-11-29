import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontsEnum } from '../../enums/fonts.enum';
import { ColorsEnum } from '../../enums/colors.enum';

interface CustomTextPropsInterface {
  text: string;
  fontSize: any;
  fontFamily: FontsEnum;
  color: ColorsEnum;
  style?: HTMLStyleElement;
}

const styles = StyleSheet.create({
  textStyles: {
    textAlign: 'center'
  }
});

const CustomText: FunctionComponent<CustomTextPropsInterface> = ({
  text,
  color,
  fontFamily,
  fontSize,
  style
}: CustomTextPropsInterface): React.ReactElement => {
  const propsStyles = StyleSheet.create({
    textStyling: {
      fontSize: fontSize,
      fontFamily: fontFamily,
      color: color
    }
  });
  return (
    <View style={style}>
      <Text style={[propsStyles.textStyling, styles.textStyles]}>{text}</Text>
    </View>
  );
};
export default CustomText;
