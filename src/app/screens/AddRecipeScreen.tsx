import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Route, StyleSheet, View } from 'react-native';
import { ColorsEnum } from '../enums/colors.enum';
import CustomText from '../components/shared/CustomText';
import { FontsEnum } from '../enums/fonts.enum';
import CustomInput from '../components/shared/CustomInput';
import CustomPicker from '../components/shared/CustomPicker';
import CustomButton from '../components/shared/CustomButton';
import CustomCheckBox from '../components/shared/CustomCheckBox';
import { Formik } from 'formik';
import { RecipeListItem } from '../interfaces/recipe.interface';
import { addRecipe } from '../services/dataApi';
import { ScreensEnum } from '../enums/screens.enum';
import { useNavigation } from '@react-navigation/native';
import { calculateTime } from '../helpers/calculateTime';
import { AddRecipeValidationSchema } from '../helpers/validator';
import SlidingTimePicker from '../components/SlidingTimePicker';
import CustomStepIndicator from '../components/shared/CustomStepIndicator';
import { RecipeCategories } from '../enums/recipe-categories.enum';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: 25,
    height: '100%'
  },
  title: {
    marginBottom: 25
  },
  inputsDistance: {
    marginBottom: 15
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stepIndicator: {
    width: '100%',
  },
  formWithButtonsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%'
  }
});

const initialFormValues: RecipeListItem = {
  title: '',
  category: '',
  time: '',
  description: '',
  authors: '',
  isFavourite: false,
  ingredients: []
};

//ToDo add image later
//ToDo add validator
const AddRecipeScreen: FunctionComponent<{}> = (): React.ReactElement => {
  const [isAddedToFavourites, setIsAddedToFavourites] = useState<boolean>(false);
  const [time, setTime] = useState<string>('00:00:00');
  const [category, setCategory] = useState<string>('');
  const navigation: Route = useNavigation();

  const labels: string[] = ['Basic information', 'Ingredients', 'Description'];
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  const addToFavourites = useCallback((): void => {
    setIsAddedToFavourites(!isAddedToFavourites);
  }, [isAddedToFavourites, setIsAddedToFavourites]);

  //ToDo add error handling
  const addNewRecipe = async (recipeItems: RecipeListItem): Promise<void> => {
    console.log(recipeItems)
    // try {
    //   await AddRecipeValidationSchema.validate(recipeItems);
    //   await addRecipe(recipeItems);
    //   navigation.navigate(ScreensEnum.MENU);
    // } catch (e) {
    //   //ToDo fireup the error message
    //   console.log(e);
    // }
  };

  const setTimeValue = useCallback(async (timeValue: any) => {
    const calculatedTime: string = calculateTime(timeValue);
    setTime(calculatedTime);
  }, []);

  const moveIndicatorStep = useCallback(
    (isStepForward: boolean) => {
      const modifier: number = isStepForward ? 1 : -1;
      setCurrentPosition(currentPosition + modifier);
    },
    [currentPosition]
  );

  const buttonForward = useMemo(() => {
    if (currentPosition !== 2) {
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

  const recipeCategories: RecipeCategories[] = [RecipeCategories.BREAKFAST, RecipeCategories.DINNER, RecipeCategories.DESSERT];

  //ToDo add stepper & divide to sections
  return (
    <View style={styles.wrapper}>
        {/* <KeyboardAvoidingView behavior={'position'} style={styles.container}> */}
        <CustomText text={'Add recipe'} fontSize={40} fontFamily={FontsEnum.SEN_BOLD} color={ColorsEnum.DARK_GREEN} style={styles.title} />
        <CustomStepIndicator style={styles.stepIndicator} currentPosition={currentPosition} labels={labels} stepCount={labels.length} />

        <Formik
          initialValues={initialFormValues}
          onSubmit={(values) => addNewRecipe({ ...values, isFavourite: isAddedToFavourites, category, time })}
        >
          {({ handleSubmit, handleChange, values }) => (
            <View style={styles.formWithButtonsContainer}>
              <View>
                {currentPosition === 0 && (
                  <>
                    <CustomInput
                      placeholder={'Title'}
                      style={styles.inputsDistance}
                      onChange={handleChange('title')}
                      value={values.title}
                      autoFocus={false}
                    />
                    <CustomPicker style={styles.inputsDistance} list={recipeCategories} onChange={setCategory} />
                    <SlidingTimePicker style={styles.inputsDistance} step={15} maxValue={480} minValue={0} onValueChange={setTimeValue} timeValue={time} />
                    <CustomInput
                      placeholder={'Author'}
                      style={styles.inputsDistance}
                      onChange={handleChange('authors')}
                      value={values.authors}
                      autoFocus={false}
                    />
                     <CustomCheckBox
                      text={'Add this recipe to favourites'}
                      value={isAddedToFavourites}
                      onValueChange={addToFavourites}
                    />
                  </>
                )}
                {currentPosition == 1 && (
                    <CustomText
                      text={'Ingredients coming soon...'}
                      fontSize={30}
                      fontFamily={FontsEnum.SEN_BOLD}
                      color={ColorsEnum.DARK_GREEN}
                    />
                )}
                {currentPosition == 2 && (
                  <>
                    <CustomInput
                      placeholder={'Description'}
                      style={styles.inputsDistance}
                      onChange={handleChange('description')}
                      value={values.description}
                      multiline
                    />
                  </>
                )}
              </View>
              <View style={styles.navigationButtons}>
                {buttonBack}
                {buttonForward}
                {currentPosition === 2 && <CustomButton text={'Submit'} onPress={handleSubmit} />}
              </View>
            </View>
          )}
        </Formik>
        {/* </KeyboardAvoidingView> */}
      </View>
  );
};

export default AddRecipeScreen;
