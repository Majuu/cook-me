import { FunctionComponent, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '../shared/CustomButton';
import CustomInput from '../shared/CustomInput';

interface AddNewRecipeDescriptionStepProps {
  onAddDescriptionStep: any;
}

const styles = StyleSheet.create({
  container: {
    height: '45%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
  },
  buttonGap: {
    marginTop: 15,
  },
});

const AddNewRecipeDescriptionStep: FunctionComponent<
  AddNewRecipeDescriptionStepProps
> = ({ onAddDescriptionStep }) => {
  const [descriptionValue, setDescriptionValue] = useState<any>('');

  const addDescriptioinStep = () => {
    onAddDescriptionStep(descriptionValue);
    setDescriptionValue('');
  };

  return (
    <View style={styles.container}>
      <CustomInput
        value={descriptionValue}
        onChange={setDescriptionValue}
        placeholder={'Describe the recipe step'}
        autoFocus
        multiline
        style={styles.input}
        deepInputStyles={styles.input}
      />
      <CustomButton
        disabled={!descriptionValue.length}
        onPress={addDescriptioinStep}
        text={'Add'}
        style={styles.buttonGap}
      />
    </View>
  );
};

export default AddNewRecipeDescriptionStep;
