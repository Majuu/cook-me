import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { ColorsEnum } from '../enums/colors.enum';
import CustomText from './shared/CustomText';
import { FontsEnum } from '../enums/fonts.enum';

interface SlidingTimePickerProps {
  minValue: number;
  maxValue: number;
  step: number;
  onValueChange: (value: number) => void;
  timeValue: string;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: ColorsEnum.GREEN,
    borderRadius: 15,
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'column'
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15
  }
});

const SlidingTimePicker: FunctionComponent<SlidingTimePickerProps> = ({ maxValue, minValue, step, onValueChange, timeValue }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <CustomText text={'Time duration'} fontSize={18} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
        <CustomText text={timeValue} fontSize={18} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
      </View>
      <Slider minimumValue={minValue} maximumValue={maxValue} onValueChange={onValueChange} step={step} />
    </View>
  );
};

export default SlidingTimePicker;
