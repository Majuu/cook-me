import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { ColorsEnum } from '../../enums/colors.enum';
import SelectDropdown from 'react-native-select-dropdown';
import { FontsEnum } from '../../enums/fonts.enum';

interface CustomPickerProps {
  list: Array<any>;
  onChange: Function;
  placeholder?: string;
  style?: HTMLStyleElement;
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 2,
    borderColor: ColorsEnum.GREEN,
    borderRadius: 15,
    borderStyle: 'solid',
    width: '100%',
    height: 46,
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: ColorsEnum.DARK_GREEN,
    fontFamily: FontsEnum.SEN_REGULAR,
    textAlign: 'left',
  },
  dropdown: {
    borderWidth: 2,
    borderColor: ColorsEnum.LIGHT_GREEN,
    borderStyle: 'solid'
  },
  dropdownRow: {
    borderBottomWidth: 2, 
    borderBottomColor: ColorsEnum.LIGHT_GREEN
  }
});

const CustomPicker: FunctionComponent<CustomPickerProps> = ({ list, onChange, style, placeholder }): React.ReactElement => {
  return (
      <SelectDropdown
        onChangeSearchInputText={() => {}}
	      data={list}
        defaultButtonText={placeholder}
        buttonTextStyle={styles.buttonText}
        rowTextStyle={styles.buttonText}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.dropdownRow}
        onSelect={(selectedItem) => {
          onChange(selectedItem)
        }}
        dropdownOverlayColor={'none'}
        buttonStyle={{...styles.buttonContainer, ...style}}
        />
  );
};

export default CustomPicker;
