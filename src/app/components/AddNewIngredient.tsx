import { Formik } from "formik";
import { FunctionComponent, ReactElement, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ingredientUnits } from "../consts/ingredient-units.const";
import { predefinedIngredients } from "../consts/predefined-ingredients.const";
import CustomButton from "./shared/CustomButton";
import CustomInput from "./shared/CustomInput";
import CustomPicker from "./shared/CustomPicker";

interface AddNewIngredientProps {
    onAddNewIngredient: Function;
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20
    },
    innerDistance: {
        marginBottom: 10
    },
    singleLineInputsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    amountPicker: {
        width: '65%'
    },
    unitPicker: {
        width: '35%'
    }
  });

const AddNewIngredient: FunctionComponent<AddNewIngredientProps> = ({onAddNewIngredient}): ReactElement => {
    const [ isPredefinedListVisible, setIsPredefinedListVisible] = useState<boolean>(true);

    const newIngredientInitialValues = {
        name: '',
        amount: '',
        unit: ''
    }

    //TODO ADD PICKER RESET VALUE!
    //TODO form reset after adding an ingredient

    return (
        <View style={styles.container}>
            <Formik
                initialValues={newIngredientInitialValues}
                onSubmit={(values) => onAddNewIngredient(values)}
            >
            {({ handleSubmit, handleChange, values, setFieldValue, resetForm }) => (
                <>
                {isPredefinedListVisible ? 
                    <CustomPicker style={styles.innerDistance} list={predefinedIngredients} placeholder={'Select ingredient'} onChange={handleChange('name')}></CustomPicker>
                    :
                    <CustomInput onChange={handleChange('name')}
                    value={values.name} style={styles.innerDistance} placeholder={'Type in the ingredient'} />
                }
                <View style={[styles.innerDistance, styles.singleLineInputsContainer]}>
                    <CustomInput onChange={handleChange('amount')}
                        value={values.amount} style={styles.amountPicker} numberedInput placeholder={'Amount'}></CustomInput>
                    <CustomPicker style={styles.unitPicker} list={ingredientUnits} placeholder={'Unit'} onChange={handleChange('unit')}></CustomPicker>
                </View>
                <View style={styles.singleLineInputsContainer}>
                    <CustomButton text={ isPredefinedListVisible ? 'Custom' : 'List'} onPress={() => {setIsPredefinedListVisible(!isPredefinedListVisible); setFieldValue('name', '')}} />
                    <CustomButton text="Add" onPress={handleSubmit} />
                </View>
                </>
            )}
            </Formik>
        </View>
    )
}

export default AddNewIngredient;