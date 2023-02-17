import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CustomText from './shared/CustomText';
import { FontsEnum } from '../enums/fonts.enum';
import { ColorsEnum } from '../enums/colors.enum';
import { capitalize } from 'lodash';
import { Recipe } from '../interfaces/recipe.interface';
import { IngredientUnit } from '../enums/ingredient-units.enum';

interface RecipeContentProps {
  recipe: Recipe;
  labels: Array<string>;
  currentStep: number;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
    flexGrow: 1,
  },
  sectionWrapper: {
    marginTop: 30,
    flexGrow: 1,
  },
  ingredientsHeader: {
    marginBottom: 20,
  },
  ingredientWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: ColorsEnum.GREEN,
    paddingVertical: 10,
  },
  contentContainer: {
    height: 450,
  },
  introContentContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexGrow: 1,
  },
  preparationTime: {
    marginBottom: 10,
  },
  singleDescriptionContentContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  descriptionInnercontainer: {
    width: '95%',
  },
  ingredientWithUnitContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const RecipeContent: FunctionComponent<RecipeContentProps> = ({
  recipe,
  labels,
  currentStep,
}): React.ReactElement => {
  const { ingredients, authors, description, title, time } = recipe;

  const introContent =
    <View style={styles.introContentContainer}>
      <CustomText
        text={title}
        fontSize={35}
        fontFamily={FontsEnum.SEN_REGULAR}
        color={ColorsEnum.DARK_GREEN}
      />
      <View>
        <CustomText
          style={styles.preparationTime}
          text={'Time of preparation'}
          fontSize={20}
          fontFamily={FontsEnum.SEN_REGULAR}
          color={ColorsEnum.DARK_GREEN}
        />
        <CustomText
          text={time}
          fontSize={16}
          fontFamily={FontsEnum.SEN_REGULAR}
          color={ColorsEnum.DARK_GREEN}
        />
      </View>
      <View>
        <CustomText
          text={'Created by:'}
          fontSize={18}
          fontFamily={FontsEnum.SEN_REGULAR}
          color={ColorsEnum.DARK_GREEN}
        />
        <CustomText
          text={authors}
          fontSize={18}
          fontFamily={FontsEnum.SEN_REGULAR}
          color={ColorsEnum.DARK_GREEN}
        />
      </View>
    </View>

  const ingredientsContent = 
    <View style={styles.contentContainer}>
      <CustomText
        text={'You will need:'}
        fontSize={20}
        fontFamily={FontsEnum.SEN_REGULAR}
        color={ColorsEnum.DARK_GREEN}
        style={styles.ingredientsHeader}
      />
      <FlatList
        data={ingredients}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }): React.ReactElement => (
          <View key={item.name} style={styles.ingredientWrapper}>
            <CustomText
              text={capitalize(item.name)}
              fontSize={22}
              fontFamily={FontsEnum.SEN_REGULAR}
              color={ColorsEnum.DARK_GREEN}
            />
            <View style={styles.ingredientWithUnitContainer}>
              <CustomText
                text={capitalize(item.amount.toString())}
                fontSize={22}
                fontFamily={FontsEnum.SEN_REGULAR}
                color={ColorsEnum.DARK_GREEN}
              />
              {item.unit && item.unit !== IngredientUnit.NO_UNIT && (
                <CustomText
                  text={item.unit}
                  fontSize={22}
                  fontFamily={FontsEnum.SEN_REGULAR}
                  color={ColorsEnum.DARK_GREEN}
                />
              )}
            </View>
          </View>
        )}
        keyExtractor={(_item, index): string => index.toString()}
        ListEmptyComponent={
          <CustomText
            fontFamily={FontsEnum.SEN_REGULAR}
            color={ColorsEnum.DARK_GREEN}
            fontSize={15}
            text="There are no ingredients yet"
          />
        }
      />
    </View>;

  const descriptionContent = 
    <View style={styles.contentContainer}>
      <FlatList
        data={description}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        renderItem={({ item, index }): React.ReactElement => (
          <View key={index} style={styles.singleDescriptionContentContainer}>
            <CustomText
              text={`${index + 1}. `.toString()}
              fontSize={18}
              fontFamily={FontsEnum.SEN_REGULAR}
              color={ColorsEnum.DARK_GREEN}
            />
            <CustomText
              style={styles.descriptionInnercontainer}
              textAlignPosition={'left'}
              text={item}
              fontSize={18}
              fontFamily={FontsEnum.SEN_REGULAR}
              color={ColorsEnum.DARK_GREEN}
            />
          </View>
        )}
        keyExtractor={(_item, index): string => index.toString()}
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

  return (
    <View style={styles.container}>
      <CustomText
        text={labels[currentStep]}
        fontSize={30}
        fontFamily={FontsEnum.SEN_REGULAR}
        color={ColorsEnum.DARK_GREEN}
      />
      <View style={styles.sectionWrapper}>
        {currentStep === 0 && introContent}
        {currentStep === 1 && ingredientsContent}
        {currentStep === 2 && descriptionContent}
      </View>
    </View>
  );
};

export default RecipeContent;
