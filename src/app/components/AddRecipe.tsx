import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Route, StyleSheet, View } from 'react-native';
import { ColorsEnum } from '../enums/colors.enum';
import CustomText from './shared/CustomText';
import { FontsEnum } from '../enums/fonts.enum';
import CustomInput from './shared/CustomInput';
import CustomPicker from './shared/CustomPicker';
import { pastryCategories } from '../consts/pastry-categories.const';
import CustomButton from './shared/CustomButton';
import CustomCheckBox from './shared/CustomCheckBox';
import { Formik } from 'formik';
import { RecipeListItem } from '../interfaces/recipe.interface';
import { addRecipe } from '../services/dataApi';
import { ScreensEnum } from '../enums/screens.enum';
import { useNavigation } from '@react-navigation/native';
import { calculateTime } from '../helpers/calculateTime';
import { AddRecipeValidationSchema } from '../helpers/validator';
import SlidingTimePicker from './SlidingTimePicker';
import CustomStepIndicator from './shared/CustomStepIndicator';

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorsEnum.LIGHT_GREEN,
    padding: 25,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  wrapper: {
    alignItems: 'center'
  },
  title: {
    marginTop: 30,
    marginBottom: 25
  },
  inputsDistance: {
    marginBottom: 10
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  formWrapper: {
    height: 350,
    display: 'flex',
    justifyContent: 'center'
  },
  isFavouriteCheckbox: {
    justifyContent: 'center'
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
    try {
      await AddRecipeValidationSchema.validate(recipeItems);
      await addRecipe(recipeItems);
      navigation.navigate(ScreensEnum.MENU);
    } catch (e) {
      //ToDo fireup the error message
      console.log(e);
    }
  };

  const setTimeValue = useCallback(async (timeValue) => {
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

  //ToDo add stepper & divide to sections
  return (
    <KeyboardAvoidingView behavior={'position'} style={styles.container}>
      <View style={styles.wrapper}>
        <CustomText text={'Add recipe'} fontSize={40} fontFamily={FontsEnum.SEN_BOLD} color={ColorsEnum.DARK_GREEN} style={styles.title} />
        {/*TODO tooltip*/}
        {/*<CustomText*/}
        {/*  text={`The place where you add your own recipes. Did you find one somewhere and don't want to lose it? Or maybe you are creating something new? Here you will save it!`}*/}
        {/*  fontSize={20}*/}
        {/*  fontFamily={FontsEnum.SEN_REGULAR}*/}
        {/*  color={ColorsEnum.DARK_GREEN}*/}
        {/*  style={styles.title}*/}
        {/*/>*/}

        <Formik
          initialValues={initialFormValues}
          onSubmit={(values) => addNewRecipe({ ...values, isFavourite: isAddedToFavourites, category, time })}
        >
          {({ handleSubmit, handleChange, values }) => (
            <View style={{ width: '100%' }}>
              <CustomStepIndicator currentPosition={currentPosition} labels={labels} stepCount={labels.length} />
              <View style={styles.formWrapper}>
                {currentPosition === 0 && (
                  <>
                    <CustomInput
                      placeholder={'Author'}
                      style={styles.inputsDistance}
                      onChange={handleChange('authors')}
                      value={values.authors}
                      autoFocus={false}
                    />
                    <CustomPicker style={styles.inputsDistance} list={pastryCategories} onChange={setCategory} value={category} />
                    <CustomInput
                      placeholder={'Title'}
                      style={styles.inputsDistance}
                      onChange={handleChange('title')}
                      value={values.title}
                      autoFocus={false}
                    />
                    <SlidingTimePicker step={5} maxValue={180} minValue={0} onValueChange={setTimeValue} timeValue={time} />
                  </>
                )}
                {currentPosition == 1 && (
                  <>
                    <CustomText
                      text={'Ingredients coming soon...'}
                      fontSize={30}
                      fontFamily={FontsEnum.SEN_BOLD}
                      color={ColorsEnum.DARK_GREEN}
                    />
                  </>
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
                    <CustomCheckBox
                      text={'Add this recipe to favourites'}
                      value={isAddedToFavourites}
                      onValueChange={addToFavourites}
                      style={styles.isFavouriteCheckbox}
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
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddRecipeScreen;
