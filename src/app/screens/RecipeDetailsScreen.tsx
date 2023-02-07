import { FunctionComponent, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import StepIndicator from "react-native-step-indicator/lib/typescript/src/types";
import RecipeContent from "../components/RecipeContent";
import CustomText from "../components/shared/CustomText";
import { ColorsEnum } from "../enums/colors.enum";
import { FontsEnum } from "../enums/fonts.enum";

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      backgroundColor: ColorsEnum.LIGHT_GREEN
    },
    header: {
      marginTop: 15,
      marginBottom: 20
    },
    topContainerWrapper: {
      marginTop: 50,
      paddingBottom: 15,
      borderBottomWidth: 4,
      borderStyle: 'solid',
      borderColor: ColorsEnum.GREEN
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20
    },
    stepIndicator: {
      width: 'auto',
      borderRightWidth: 1,
      borderStyle: 'solid',
      borderColor: ColorsEnum.DARK_GREEN,
      paddingRight: 3,
      marginLeft: 6
    },
    recipeContent: {
      flex: 1
    }
});

const RecipeDeailsScreen: FunctionComponent = () => {
    const [currentPosition, setCurrentPosition] = useState<number>(1);
    const labels = ['Checklist', 'Cook!', 'To sum up', 'Authors'];

    const item = {title: 'Title'}

    return (
        <>
        <View style={styles.container}>
        <View style={styles.topContainerWrapper}>
          {/* <StepIndicator
            labels={labels}
            direction={'horizontal'}
            currentPosition={currentPosition}
            stepCount={4}
            customStyles={{
              stepIndicatorSize: 40,
              currentStepIndicatorSize: 40,
              separatorStrokeWidth: 4,
              currentStepStrokeWidth: 4,
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
              labelAlign: 'flex-start'
            }}
          /> */}
        </View>
        <ScrollView style={styles.recipeContent}>
          <View style={styles.header}>
            <CustomText text={item.title} fontSize={40} fontFamily={FontsEnum.SEN_EXTRABOLD} color={ColorsEnum.DARK_GREEN} />
          </View>
          {/* <RecipeContent item={item} labels={labels} /> */}
        </ScrollView>
      </View>
      </>
    )
}

export default RecipeDeailsScreen;