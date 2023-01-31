import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";
import { ColorsEnum } from "../enums/colors.enum";
import { FontsEnum } from "../enums/fonts.enum";
import { Ingredient } from "../interfaces/recipe.interface";
import CustomText from "./shared/CustomText";
import Bin from '../../../assets/images/app-interaction-icons/bin.svg';
import { TouchableOpacity } from "react-native-gesture-handler";
import { IngredientUnit } from "../enums/ingredient-units.enum";

interface NewIngredientListItemProps {
    ingredient: Ingredient;
    onDelete: any;
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: ColorsEnum.LIGHT_GREEN,
      borderBottomWidth: 1,
      paddingVertical: 7
    },
    deleteIcon: {
        padding: 10,
        color: 'red'
    }
  });

const NewIngredientListItem: FunctionComponent<NewIngredientListItemProps> = ({ingredient, onDelete}) => {
    const {amount, name, unit} = ingredient;

    return (
        <View style={styles.container}>
            <CustomText 
                fontFamily={FontsEnum.SEN_REGULAR} 
                color={ColorsEnum.GREEN} 
                fontSize={20} 
                text={`${amount}${unit !== IngredientUnit.NO_UNIT ? unit : ''} ${name}`} />
            <TouchableOpacity onPress={onDelete} style={styles.deleteIcon}>
                <Bin width={20} height={20} />
            </TouchableOpacity>
        </View>
    )
}

export default NewIngredientListItem;