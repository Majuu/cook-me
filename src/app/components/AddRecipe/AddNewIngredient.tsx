import { Formik, FormikErrors, FormikState } from 'formik';
import { FunctionComponent, ReactElement, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ingredientUnits } from '../../consts/ingredient-units.const';
import { predefinedIngredients } from '../../consts/predefined-ingredients.const';
import { AddIngredientValidationSchema } from '../../helpers/validator';
import CustomButton from '../shared/CustomButton';
import CustomInput from '../shared/CustomInput';
import CustomPicker from '../shared/CustomPicker';

interface AddNewIngredientProps {
  onAddNewIngredient: Function;
}

interface SubmitFormArgs {
  values: any;
  resetForm: (nextState?: Partial<FormikState<any>>) => void;
  validateForm: (values?: any) => Promise<FormikErrors<any>>;
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  innerDistance: {
    marginBottom: 15,
  },
  singleLineInputsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountPicker: {
    width: '65%',
  },
  unitPicker: {
    width: '35%',
  },
});

const AddNewIngredient: FunctionComponent<AddNewIngredientProps> = ({
  onAddNewIngredient,
}): ReactElement => {
  const [isPredefinedListVisible, setIsPredefinedListVisible] =
    useState<boolean>(true);
  const ingredientPickerRef = useRef<SelectDropdown>(null);
  const unitPickerRef = useRef<SelectDropdown>(null);

  const newIngredientInitialValues = {
    name: '',
    amount: '',
    unit: '',
  };

  const submitForm = ({
    resetForm,
    validateForm,
    values,
  }: SubmitFormArgs): void => {
    onAddNewIngredient(values);
    resetForm();

    if (ingredientPickerRef && ingredientPickerRef.current) {
      ingredientPickerRef.current.reset();
    }
    if (unitPickerRef && unitPickerRef.current) {
      unitPickerRef.current.reset();
    }
    validateForm();
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={newIngredientInitialValues}
        onSubmit={(values, { resetForm, validateForm }) =>
          submitForm({ values, resetForm, validateForm })
        }
        validationSchema={AddIngredientValidationSchema}
        validateOnMount={true}>
        {({ handleSubmit, handleChange, values, setFieldValue, isValid }) => (
          <>
            {isPredefinedListVisible ? 
              <CustomPicker
                reference={ingredientPickerRef}
                style={styles.innerDistance}
                list={predefinedIngredients}
                placeholder={'Select ingredient'}
                onChange={handleChange('name')}
              />
             : 
              <CustomInput
                onChange={handleChange('name')}
                value={values.name}
                style={styles.innerDistance}
                placeholder={'Type in the ingredient'}
              />
            }
            <View
              style={[styles.innerDistance, styles.singleLineInputsContainer]}>
              <CustomInput
                onChange={handleChange('amount')}
                value={values.amount.toString()}
                style={styles.amountPicker}
                numberedInput
                placeholder={'Amount'}
              />
              <CustomPicker
                reference={unitPickerRef}
                style={styles.unitPicker}
                list={ingredientUnits}
                placeholder={'Unit'}
                onChange={handleChange('unit')}
              />
            </View>
            <View style={styles.singleLineInputsContainer}>
              <CustomButton
                text={isPredefinedListVisible ? 'Custom' : 'List'}
                onPress={() => {
                  setIsPredefinedListVisible(!isPredefinedListVisible);
                  setFieldValue('name', '');
                }}
              />
              <CustomButton
                disabled={!isValid}
                text="Add"
                onPress={handleSubmit}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddNewIngredient;
