import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Route, StyleSheet, View } from 'react-native';
import { ColorsEnum } from '../enums/colors.enum';
import CustomText from '../components/shared/CustomText';
import { FontsEnum } from '../enums/fonts.enum';
import CustomInput from '../components/shared/CustomInput';
import CustomPicker from '../components/shared/CustomPicker';
import CustomButton from '../components/shared/CustomButton';
import CustomCheckBox from '../components/shared/CustomCheckBox';
import { Formik } from 'formik';
import { Ingredient, Recipe } from '../interfaces/recipe.interface';
import { addRecipe } from '../services/dataApi';
import { ScreensEnum } from '../enums/screens.enum';
import { useNavigation } from '@react-navigation/native';
import { calculateTime } from '../helpers/calculateTime';
import { AddRecipeValidationSchema } from '../helpers/validator';
import SlidingTimePicker from '../components/AddRecipe/SlidingTimePicker';
import CustomStepIndicator from '../components/shared/CustomStepIndicator';
import { RecipeCategories } from '../enums/recipe-categories.enum';
import AddNewIngredient from '../components/AddRecipe/AddNewIngredient';
import { FlatList } from 'react-native-gesture-handler';
import NewIngredientListItem from '../components/AddRecipe/NewIngredientListItem';
import AddNewRecipeDescriptionStep from '../components/AddRecipe/AddNewRecipeDescriptionStep';
import NewDescriptionStepListItem from '../components/AddRecipe/NewDescriptionStepListItem';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: 25,
    height: '100%',
  },
  title: {
    marginBottom: 25,
  },
  inputsDistance: {
    marginBottom: 15,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepIndicator: {
    width: '100%',
  },
  formWithButtonsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
  },
  newIngredientContainer: {
    height: '90%',
  },
});

const AddRecipeScreen: FunctionComponent<{}> = (): React.ReactElement => {
  const [isAddedToFavourites, setIsAddedToFavourites] =
    useState<boolean>(false);
  const [time, setTime] = useState<string>('00:00:00');
  const [category, setCategory] = useState<string>('');
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const navigation: Route = useNavigation();

  const initialFormValues: Recipe = useMemo(() => {
    return {
      title: '',
      category: '',
      time: '',
      description: [],
      authors: '',
      isFavourite: false,
      ingredients: [],
    };
  }, []);
  const labels: string[] = useMemo(
    () => ['Basic information', 'Ingredients', 'Description'],
    [],
  );

  const addToFavourites = useCallback((): void => {
    setIsAddedToFavourites(!isAddedToFavourites);
  }, [isAddedToFavourites, setIsAddedToFavourites]);

  const addNewRecipe = async (recipeItems: Recipe): Promise<void> => {
    try {
      await addRecipe(recipeItems);
      navigation.navigate(ScreensEnum.MENU);
    } catch (e) {
      console.log(e);
    }
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
    [currentPosition],
  );

  const buttonForward = useMemo(() => {
    if (currentPosition !== 2) {
      return (
        <CustomButton text={'Next'} onPress={() => moveIndicatorStep(true)} />
      );
    }
  }, [currentPosition, moveIndicatorStep]);

  const buttonBack = useMemo(() => {
    if (currentPosition !== 0) {
      return (
        <CustomButton text={'Back'} onPress={() => moveIndicatorStep(false)} />
      );
    } else {
      return <View />;
    }
  }, [currentPosition, moveIndicatorStep]);

  const recipeCategories: RecipeCategories[] = [
    RecipeCategories.BREAKFAST,
    RecipeCategories.DINNER,
    RecipeCategories.DESSERT,
  ];

  const removeItemFromTheList = (
    itemsList: Array<any>,
    index: number,
    deleteFn: Function,
    fieldName: string,
  ): void => {
    itemsList.splice(index, 1);
    deleteFn(fieldName, itemsList);
  };

  return (
    <View style={styles.wrapper}>
      <CustomText
        text={'Add recipe'}
        fontSize={40}
        fontFamily={FontsEnum.SEN_REGULAR}
        color={ColorsEnum.DARK_GREEN}
        style={styles.title}
      />
      <CustomStepIndicator
        style={styles.stepIndicator}
        currentPosition={currentPosition}
        labels={labels}
      />

      <Formik
        initialValues={initialFormValues}
        onSubmit={values =>
          addNewRecipe({
            ...values,
            isFavourite: isAddedToFavourites,
            category,
            time,
          })
        }
        validateOnMount={true}
        validationSchema={AddRecipeValidationSchema}>
        {({ handleSubmit, handleChange, values, setFieldValue, isValid }) => (
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
                  <CustomPicker
                    placeholder={'Select category'}
                    style={styles.inputsDistance}
                    list={recipeCategories}
                    onChange={setCategory}
                  />
                  <SlidingTimePicker
                    style={styles.inputsDistance}
                    step={15}
                    maxValue={480}
                    minValue={0}
                    onValueChange={setTimeValue}
                    timeValue={time}
                  />
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
                <View style={styles.newIngredientContainer}>
                  <AddNewIngredient
                    onAddNewIngredient={(newIngredient: Ingredient) => {
                      setFieldValue('ingredients', [
                        ...values.ingredients,
                        newIngredient,
                      ]);
                    }}
                  />
                  <FlatList
                    data={values.ingredients}
                    scrollEnabled={true}
                    renderItem={({ item, index }): React.ReactElement => (
                      <NewIngredientListItem
                        ingredient={item}
                        onDelete={() =>
                          removeItemFromTheList(
                            values.ingredients,
                            index,
                            setFieldValue,
                            'ingredients',
                          )
                        }
                      />
                    )}
                    keyExtractor={(item, index): string =>
                      index + item?.amount + item?.name + item.unit
                    }
                    ListEmptyComponent={
                      <CustomText
                        fontFamily={FontsEnum.SEN_REGULAR}
                        color={ColorsEnum.DARK_GREEN}
                        fontSize={15}
                        text="There are no ingredients yet"
                      />
                    }
                  />
                </View>
              )}
              {currentPosition == 2 && (
                <>
                  <View style={styles.newIngredientContainer}>
                    <AddNewRecipeDescriptionStep
                      onAddDescriptionStep={(newDescriptionStep: any) => {
                        setFieldValue('description', [
                          ...values.description,
                          newDescriptionStep,
                        ]);
                      }}
                    />
                    <FlatList
                      data={values.description}
                      scrollEnabled={true}
                      renderItem={({ item, index }): React.ReactElement => (
                        <NewDescriptionStepListItem
                          index={index}
                          descriptionStep={item}
                          onDelete={() =>
                            removeItemFromTheList(
                              values.description,
                              index,
                              setFieldValue,
                              'description',
                            )
                          }
                        />
                      )}
                      keyExtractor={(item, index): string => index.toString()}
                      ListEmptyComponent={
                        <CustomText
                          fontFamily={FontsEnum.SEN_REGULAR}
                          color={ColorsEnum.DARK_GREEN}
                          fontSize={15}
                          text="There are no instructions yet."
                        />
                      }
                    />
                  </View>
                </>
              )}
            </View>
            <View style={styles.navigationButtons}>
              {buttonBack}
              {buttonForward}
              {currentPosition === 2 && (
                <CustomButton
                  disabled={!isValid}
                  text={'Submit'}
                  onPress={handleSubmit}
                />
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddRecipeScreen;
