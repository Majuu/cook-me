import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { FunctionComponent, useMemo, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import RecipeContent from "../components/RecipeContent";
import { ColorsEnum } from "../enums/colors.enum";
import { Recipe } from "../interfaces/recipe.interface";
import CustomStepIndicator from '../components/shared/CustomStepIndicator';
import CustomButton from "../components/shared/CustomButton";

const styles = StyleSheet.create({
    container: {
      height: '100%',
      padding: 25
    },
    topContainerWrapper: {
      paddingTop: 30,
      borderStyle: 'solid',
      borderColor: ColorsEnum.GREEN,
      borderBottomWidth: 1
    },
    stepButtonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
});

const RecipeDeailsScreen: FunctionComponent = () => {
    const route = useRoute<RouteProp<{params: {recipe: Recipe}}>>();  
    const recipe = route.params.recipe;
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const labels = useMemo(() => ['Overview', 'Ingredients', 'Cook!'], []);
    const navigation = useNavigation();

    const moveIndicatorStep = useCallback((isStepForward: boolean) => {
        setCurrentPosition(currentPosition + (isStepForward ? 1 : -1));
      },[currentPosition]);

    const buttonForward = useMemo(() => {
      if (currentPosition !== labels.length - 1) {
        return <CustomButton text={'Next'} onPress={() => moveIndicatorStep(true)} />;
      }
    }, [currentPosition]);
  
    const buttonBack = useMemo(() => {
      if (currentPosition !== 0) {
        return <CustomButton text={'Back'} onPress={() => moveIndicatorStep(false)} />;
      } else {
        return <View />;
      }
    }, [currentPosition]);

    const buttonComplete = useMemo(() => {
      if (currentPosition === labels.length - 1) {
        return <CustomButton text={'Complete'} onPress={() => navigation.goBack()} />;
      } else {
        return <></>;
      }
    }, [currentPosition, navigation]);

    return (
      <>
        <View style={styles.container}>
          <View style={styles.topContainerWrapper}>
            <CustomStepIndicator labels={labels} currentPosition={currentPosition} />
          </View>
            <RecipeContent currentStep={currentPosition} recipe={recipe} labels={labels} />
          <View style={styles.stepButtonsContainer}>
            {buttonBack}
            {buttonForward}
            {buttonComplete}
          </View>
        </View>
      </>
    )
}

export default RecipeDeailsScreen;
