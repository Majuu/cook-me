import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ColorsEnum } from '../../enums/colors.enum';
import { FontsEnum } from '../../enums/fonts.enum';
import CustomText from '../shared/CustomText';
import Bin from '../../../../assets/images/app-interaction-icons/bin.svg';

interface NewDescriptionStepListItemProps {
  descriptionStep: string;
  onDelete: any;
  index: number;
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: ColorsEnum.LIGHT_GREEN,
    borderBottomWidth: 1,
    paddingVertical: 7,
  },
  text: {
    maxWidth: '80%',
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '20%',
  },
});

const NewDescriptionStepListItem: FunctionComponent<
  NewDescriptionStepListItemProps
> = ({ descriptionStep, onDelete, index }) => {
  return (
    <View style={styles.container}>
      <CustomText
        numberOfLines={1}
        style={styles.text}
        color={ColorsEnum.GREEN}
        fontFamily={FontsEnum.SEN_REGULAR}
        fontSize={20}
        text={`${index + 1}. ${descriptionStep}`}
      />
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onDelete}>
          <Bin height={22} width={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewDescriptionStepListItem;
