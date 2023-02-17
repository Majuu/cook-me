import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { ColorsEnum } from '../../enums/colors.enum';
import SelectDropdown from 'react-native-select-dropdown';
import { FontsEnum } from '../../enums/fonts.enum';
import DropdownArrow from '../../../../assets/images/app-interaction-icons/dropdown-arrow.svg';

interface CustomPickerProps {
  list: Array<any>;
  onChange: Function;
  reference?: any;
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
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: ColorsEnum.DARK_GREEN,
    fontFamily: FontsEnum.SEN_REGULAR,
    textAlign: 'left',
  },
  dropdown: {
    borderWidth: 2,
    borderColor: ColorsEnum.LIGHT_GREEN,
    borderStyle: 'solid',
  },
  dropdownRow: {
    borderBottomWidth: 2,
    borderBottomColor: ColorsEnum.LIGHT_GREEN,
  },
  dropdownIcon: {
    marginRight: 5,
  },
});

const CustomPicker: FunctionComponent<CustomPickerProps> = ({
  list,
  onChange,
  style,
  placeholder,
  reference,
}): React.ReactElement => {
  return (
    <SelectDropdown
      onChangeSearchInputText={() => {}}
      data={list}
      defaultButtonText={placeholder}
      buttonTextStyle={styles.buttonText}
      rowTextStyle={styles.buttonText}
      dropdownStyle={styles.dropdown}
      rowStyle={styles.dropdownRow}
      onSelect={selectedItem => {
        onChange(selectedItem);
      }}
      dropdownOverlayColor={'none'}
      buttonStyle={{ ...styles.buttonContainer, ...style }}
      ref={reference}
      dropdownIconPosition={'right'}
      renderDropdownIcon={() => (
        <DropdownArrow height={15} width={15} style={styles.dropdownIcon} />
      )}
    />
  );
};

export default CustomPicker;
