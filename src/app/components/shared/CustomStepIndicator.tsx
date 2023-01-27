import React, { FunctionComponent } from 'react';
import StepIndicator, {  } from 'react-native-step-indicator';
import { ColorsEnum } from '../../enums/colors.enum';
import { FontsEnum } from '../../enums/fonts.enum';
import { StyleSheet, View, Text } from 'react-native';
import { StepIndicatorStyles } from 'react-native-step-indicator/lib/typescript/src/types';

interface CustomStepIndicatorProps {
  stepCount: number;
  labels: string[];
  currentPosition: number;
  style?: HTMLStyleElement;
}

const styles = StyleSheet.create({
  indicatorWrapper: {
    marginBottom: 30
  },
  stepLabel: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: FontsEnum.SEN_BOLD,
    color: ColorsEnum.GRAY
  },
  stepLabelSelected: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: FontsEnum.SEN_EXTRABOLD,
    color: ColorsEnum.DARK_GREEN
  }
});

const stepIndicatorConfig: StepIndicatorStyles = {
  stepIndicatorSize: 40,
  currentStepIndicatorSize: 50,
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: ColorsEnum.GREEN,
  stepStrokeWidth: 4,
  stepStrokeFinishedColor: ColorsEnum.GREEN,
  stepStrokeUnFinishedColor: ColorsEnum.GRAY,
  separatorFinishedColor: ColorsEnum.GREEN,
  separatorUnFinishedColor: ColorsEnum.GRAY,
  stepIndicatorFinishedColor: ColorsEnum.GREEN,
  stepIndicatorUnFinishedColor: ColorsEnum.WHITE,
  stepIndicatorCurrentColor: ColorsEnum.WHITE,
  stepIndicatorLabelFontSize: 22,
  currentStepIndicatorLabelFontSize: 22,
  stepIndicatorLabelCurrentColor: ColorsEnum.GREEN,
  stepIndicatorLabelFinishedColor: ColorsEnum.WHITE,
  stepIndicatorLabelUnFinishedColor: ColorsEnum.GRAY,
  labelColor: '#999999',
  labelSize: 15,
  currentStepLabelColor: ColorsEnum.DARK_GREEN,
  labelAlign: 'center',
  labelFontFamily: FontsEnum.SEN_BOLD
};

const renderLabel = ({
  position,
  label,
  currentPosition
}: {
  position: number;
  stepStatus: string;
  label: string;
  currentPosition: number;
}) => {
  return <Text style={position === currentPosition ? styles.stepLabelSelected : styles.stepLabel}>{label}</Text>;
};

const CustomStepIndicator: FunctionComponent<CustomStepIndicatorProps> = ({
  currentPosition,
  labels,
  stepCount,
  style
}): React.ReactElement => {
  return (
    <View style={{ ...styles.indicatorWrapper, ...style }}>
      <StepIndicator
        labels={labels}
        direction={'horizontal'}
        currentPosition={currentPosition}
        stepCount={stepCount}
        customStyles={stepIndicatorConfig}
        renderLabel={renderLabel}
      />
    </View>
  );
};

export default CustomStepIndicator;
