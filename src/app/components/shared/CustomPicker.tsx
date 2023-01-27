import React, { Fragment, FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { ColorsEnum } from '../../enums/colors.enum';
import SelectDropdown from 'react-native-select-dropdown';
import { RecipeCategories } from '../../enums/recipe-categories.enum';
import { FontsEnum } from '../../enums/fonts.enum';

interface CustomPickerProps {
  list: RecipeCategories[];
  onChange: Function;
  style?: HTMLStyleElement;
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 2,
    borderColor: ColorsEnum.GREEN,
    borderRadius: 15,
    borderStyle: 'solid',
    width: '100%',
    height: 45
  },
  buttonText: {
    color: ColorsEnum.DARK_GREEN,
    fontFamily: FontsEnum.SEN_REGULAR,
    textAlign: 'left'
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

const CustomPicker: FunctionComponent<CustomPickerProps> = ({ list, onChange, style }): React.ReactElement => {
  return (
    <Fragment>
      <SelectDropdown
        onChangeSearchInputText={() => {}}
	      data={list}
        defaultButtonText={'Select category'}
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
    </Fragment>
  );
};

export default CustomPicker;
