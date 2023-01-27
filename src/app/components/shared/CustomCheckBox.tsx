import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import CustomText from './CustomText';
import { FontsEnum } from '../../enums/fonts.enum';
import { ColorsEnum } from '../../enums/colors.enum';

interface CustomCheckBoxProps {
  text: string;
  value: boolean;
  onValueChange: any;
  style?: HTMLStyleElement;
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkbox: {
    marginRight: 10
  }
});

const CustomCheckBox: FunctionComponent<CustomCheckBoxProps> = ({ text, value, onValueChange, style }) => {
  return (
    <View style={{ ...styles.wrapper, ...style }}>
      <CheckBox value={value} tintColor={ColorsEnum.GRAY} onTintColor={ColorsEnum.GREEN} onCheckColor={ColorsEnum.GREEN} onValueChange={onValueChange} style={styles.checkbox} />
      <CustomText text={text} fontSize={18} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
    </View>
  );
};

export default CustomCheckBox;
