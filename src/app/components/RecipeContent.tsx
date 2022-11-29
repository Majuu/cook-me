import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from './shared/CustomText';
import { FontsEnum } from '../enums/fonts.enum';
import { ColorsEnum } from '../enums/colors.enum';
import { RecipeIngredient, RecipeListItem } from '../interfaces/recipe.interface';
import { capitalize } from 'lodash';

interface RecipeContentProps {
  item: RecipeListItem;
  labels: any[];
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    paddingLeft: 6,
    paddingRight: 6
  },
  sectionWrapper: {
    marginTop: 20,
    marginBottom: 20
  },
  ingredientsHeader: {
    marginBottom: 20
  },
  ingredientWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  ingredientCellPositions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%'
  }
});

const RecipeContent: FunctionComponent<RecipeContentProps> = ({ item, labels }: RecipeContentProps): React.ReactElement => {
  const { ingredients, authors, description } = item;
  // const ingredientsKeysNames = Object.keys(item.ingredients);
  return (
    <View style={styles.container}>
      <CustomText text={labels[0]} fontSize={25} fontFamily={FontsEnum.SEN_BOLD} color={ColorsEnum.DARK_GREEN} />
      <View style={styles.sectionWrapper}>
        <CustomText
          text={'You will need:'}
          fontSize={20}
          fontFamily={FontsEnum.SEN_REGULAR}
          color={ColorsEnum.DARK_GREEN}
          style={styles.ingredientsHeader}
        />
        {ingredients.map((ingredient: RecipeIngredient) => (
          <View key={ingredient.name} style={styles.ingredientWrapper}>
            <View style={styles.ingredientCellPositions}>
              <View>
                <CustomText
                  text={capitalize(ingredient.name)}
                  fontSize={22}
                  fontFamily={FontsEnum.SEN_BOLD}
                  color={ColorsEnum.DARK_GREEN}
                />
              </View>
              <View>
                <CustomText
                  text={capitalize(String(ingredient.amount))}
                  fontSize={22}
                  fontFamily={FontsEnum.SEN_BOLD}
                  color={ColorsEnum.DARK_GREEN}
                />
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionWrapper}>
        <CustomText
          text={labels[1]}
          fontSize={25}
          fontFamily={FontsEnum.SEN_BOLD}
          color={ColorsEnum.DARK_GREEN}
          style={styles.ingredientsHeader}
        />
        <CustomText text={description} fontSize={18} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
      </View>
      <View style={styles.sectionWrapper}>
        <CustomText
          text={labels[3]}
          fontSize={25}
          fontFamily={FontsEnum.SEN_BOLD}
          color={ColorsEnum.DARK_GREEN}
          style={styles.ingredientsHeader}
        />
        <CustomText text={authors} fontSize={18} fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} />
      </View>
    </View>
  );
};

export default RecipeContent;
