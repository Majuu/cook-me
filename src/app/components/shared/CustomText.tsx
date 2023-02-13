import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontsEnum } from '../../enums/fonts.enum';
import { ColorsEnum } from '../../enums/colors.enum';

interface CustomTextPropsInterface {
  text: string;
  fontSize: any;
  fontFamily: FontsEnum;
  color: ColorsEnum;
  numberOfLines?: number;
  textAlignPosition?: 'center' | 'left';
  style?: HTMLStyleElement;
}

const styles = StyleSheet.create({
  textCentered: {
    textAlign: 'center'
  }
});

const CustomText: FunctionComponent<CustomTextPropsInterface> = ({
  text,
  color,
  fontFamily,
  fontSize,
  numberOfLines,
  style,
  textAlignPosition = 'center'
}): React.ReactElement => {
  const propsStyles = StyleSheet.create({
    textStyling: {
      fontSize: fontSize,
      fontFamily: fontFamily,
      color: color
    }
  });
  return (
    <View style={style}>
      <Text numberOfLines={numberOfLines} style={[propsStyles.textStyling, textAlignPosition === 'center' && styles.textCentered]}>{text}</Text>
    </View>
  );
};
export default CustomText;
