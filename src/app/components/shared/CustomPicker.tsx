import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ColorsEnum } from '../../enums/colors.enum';
import { PastryListCategories } from '../../consts/pastry-categories.const';

interface CustomPickerProps {
  list: PastryListCategories[];
  onChange: Function;
  value: string;
  style?: HTMLStyleElement;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: ColorsEnum.GREEN,
    borderRadius: 15,
    borderStyle: 'solid',
    width: '100%',
    height: 50
  },
  picker: {
    color: ColorsEnum.DARK_GREEN,
    width: 'auto',
    height: '100%',
    marginLeft: 8,
    marginRight: 5
  }
});

const CustomPicker: FunctionComponent<CustomPickerProps> = ({ list, onChange, value, style }: CustomPickerProps): React.ReactElement => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue: number | string): void => onChange(itemValue)}
        style={styles.picker}
        mode={'dialog'}
      >
        {list.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

export default CustomPicker;
