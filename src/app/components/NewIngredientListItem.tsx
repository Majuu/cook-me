import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { ColorsEnum } from "../enums/colors.enum";
import { FontsEnum } from "../enums/fonts.enum";
import { Ingredient } from "../interfaces/recipe.interface";
import CustomButton from "./shared/CustomButton";
import CustomText from "./shared/CustomText";

interface NewIngredientListItemProps {
    ingredient: Ingredient;
    index: number;
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: ColorsEnum.LIGHT_GREEN,
      borderBottomWidth: 1
    }
  });

const NewIngredientListItem: FunctionComponent<NewIngredientListItemProps> = ({ingredient, index}) => {
    const {amount, name, unit} = ingredient;
    return (
        <View style={styles.container}>
            <CustomText 
                fontFamily={FontsEnum.SEN_REGULAR} 
                color={ColorsEnum.GREEN} 
                fontSize={20} 
                text={`${index}. ${amount}${unit} ${name}`} />
            <CustomButton text="Delete" onPress={() => {}} />
        </View>
    )
}

export default NewIngredientListItem;