import {StyleSheet, TextInput, View} from 'react-native';
import React, {ChangeEvent, FunctionComponent, useMemo} from 'react';
import {ColorsEnum} from '../../enums/colors.enum';
import {FontsEnum} from '../../enums/fonts.enum';
// import SearchIcon from '../../../../assets/images/search.svg';

interface CustomInputProps {
  placeholder: string;
  onChange: (e: string | ChangeEvent<any>) => void;
  //ToDo correct the typing
  value: string;
  autoFocus?: boolean;
  multiline?: boolean;
  isSearchBar?: boolean;
  style?: HTMLStyleElement;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: ColorsEnum.GREEN,
    borderRadius: 15,
    textAlignVertical: 'center',
    fontFamily: FontsEnum.SEN_REGULAR,
    color: ColorsEnum.DARK_GREEN,
    height: 46,
  },
  multilineInput: {
    height: 'auto',
    textAlignVertical: 'top',
  },
  searchInput: {
    flex: 1,
    paddingLeft: 5,
    borderWidth: 0,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: ColorsEnum.GREEN,
    borderRadius: 15,
  },
  searchIcon: {
    marginLeft: 10,
  },
});

const CustomInput: FunctionComponent<CustomInputProps> = ({
  placeholder,
  value,
  onChange,
  autoFocus = false,
  multiline,
  isSearchBar = false,
  style,
}): React.ReactElement => {
  const containerStyles = useMemo(() => {
    if (isSearchBar) {
      return {...styles.searchInputContainer, ...style};
    } else {
      return {...styles.container, ...style};
    }
  }, [isSearchBar, style]);

  const inputStyles = useMemo(() => {
    if (multiline && !isSearchBar) {
      return {...styles.input, ...styles.multilineInput};
    }
    if (!multiline && isSearchBar) {
      return {...styles.input, ...styles.searchInput};
    } else {
      return styles.input;
    }
  }, [isSearchBar, multiline]);

  return (
    <View style={containerStyles}>
      {/* {isSearchBar && (
        <SearchIcon width={19} height={19} style={styles.searchIcon} />
      )} */}
      <TextInput
        multiline={multiline}
        numberOfLines={multiline ? 10 : 1}
        placeholder={placeholder}
        style={inputStyles}
        onChangeText={onChange}
        value={value}
        autoFocus={autoFocus}
      />
    </View>
  );
};

export default CustomInput;
