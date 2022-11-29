import React, {FunctionComponent} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorsEnum} from '../../enums/colors.enum';

interface ButtonPropsInterface {
  text: string;
  onPress: () => void;
  style?: HTMLStyleElement;
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 50,
    backgroundColor: ColorsEnum.GREEN,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const CustomButton: FunctionComponent<ButtonPropsInterface> = ({
  text,
  onPress,
  style,
}: ButtonPropsInterface): React.ReactElement => (
  <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
    <View>
      <Text
        style={{
          color: ColorsEnum.DARK_GREEN,
          fontSize: 20,
          // fontFamily: 'Sen-Bold',
          letterSpacing: -0.5,
        }}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default CustomButton;
