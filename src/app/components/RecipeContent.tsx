import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from './shared/CustomText';
import { FontsEnum } from '../enums/fonts.enum';
import { ColorsEnum } from '../enums/colors.enum';
import { capitalize } from 'lodash';
import { Recipe } from '../interfaces/recipe.interface';
import { ScrollView } from 'react-native-gesture-handler';
import { IngredientUnit } from '../enums/ingredient-units.enum';

interface RecipeContentProps {
  recipe: Recipe;
  labels: Array<string>; // enums
  currentStep: number;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
    flexGrow: 1
  },
  sectionWrapper: {
    marginTop: 30,
    flexGrow: 1
  },
  ingredientsHeader: {
    marginBottom: 20
  },
  ingredientWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: ColorsEnum.GREEN,
    paddingVertical: 10
  },
  contentContainer: {
    flexGrow: 1
  },
  introContentContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexGrow: 1
  },
  preparationTime: {
    marginBottom: 10
  },
  singleDescriptionContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  descriptionInnercontainer: {
    width: '95%'
  },
  ingredientWithUnitContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
});

const RecipeContent: FunctionComponent<RecipeContentProps> = ({ recipe, labels, currentStep }): React.ReactElement => {
  const { ingredients, authors, description, title, time } = recipe;

  const introContent =
      <View style={styles.introContentContainer}>
        <CustomText text={title} fontSize={35} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
        <View>
          <CustomText style={styles.preparationTime} text={'Time of preparation'} fontSize={20} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
          <CustomText text={time} fontSize={16} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
        </View>
        <View>
          <CustomText text={'Created by:'} fontSize={18} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
          <CustomText text={authors} fontSize={18} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
        </View>
      </View>

  const ingredientsContent = <View style={styles.contentContainer}>
      <CustomText
        text={'You will need:'}
        fontSize={20}
        fontFamily={FontsEnum.SEN_REGULAR}
        color={ColorsEnum.DARK_GREEN}
        style={styles.ingredientsHeader}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {ingredients.map((ingredient) => (
          <View key={ingredient.name} style={styles.ingredientWrapper}>
                <CustomText
                  text={capitalize(ingredient.name)}
                  fontSize={22}
                  fontFamily={FontsEnum.SEN_BOLD}
                  color={ColorsEnum.DARK_GREEN}
                />
                <View style={styles.ingredientWithUnitContainer}>
                <CustomText
                  text={capitalize(ingredient.amount.toString())}
                  fontSize={22}
                  fontFamily={FontsEnum.SEN_BOLD}
                  color={ColorsEnum.DARK_GREEN}
                />
                 {(ingredient.unit && ingredient.unit !== IngredientUnit.NO_UNIT) && <CustomText
                  text={ingredient.unit}
                  fontSize={22}
                  fontFamily={FontsEnum.SEN_BOLD}
                  color={ColorsEnum.DARK_GREEN}
                />}
                </View>
          </View>
        ))}
        </ScrollView>
    </View>

  const descriptionContent = <>
    <ScrollView contentContainerStyle={styles.contentContainer}>
    {description.map((descriptionStep, i) =>
      {return ( 
      <View key={i} style={styles.singleDescriptionContentContainer}>
        <CustomText text={(`${i+1}. `).toString()} fontSize={18} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
        <CustomText style={styles.descriptionInnercontainer} textAlignPosition={'left'} text={descriptionStep} fontSize={18} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
      </View>)}
    )}
    </ScrollView>
  </>

  return (
    <View style={styles.container}>
          <CustomText text={labels[currentStep]} fontSize={30} fontFamily={FontsEnum.SEN_BOLD} color={ColorsEnum.DARK_GREEN} />
          <View style={styles.sectionWrapper}>
            {currentStep === 0 && introContent}
            {currentStep === 1 && ingredientsContent}
            {currentStep === 2 && descriptionContent} 
        </View>
    </View>
  );
};

export default RecipeContent;
