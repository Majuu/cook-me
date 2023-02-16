import { ThunkDispatch } from '@reduxjs/toolkit';
import React, {FunctionComponent, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import BasicsSingleInstruction from '../components/BasicsSingleInstruction';
import CustomText from '../components/shared/CustomText';
import { ColorsEnum } from '../enums/colors.enum';
import { FontsEnum } from '../enums/fonts.enum';
import { fetchAllInstructions } from '../store/reducers/instructionsSlice';
import { RootState } from '../store/store';

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorsEnum.LIGHT_GREEN,
        width: '100%',
        height: '100%',
        padding: 20
    },
    title: {
      marginBottom: 25
    }
});

const BasicsScreen: FunctionComponent = (): React.ReactElement => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
  const instructionsList = useSelector((state: RootState) => state.instructions.instructionsList);

  useEffect(() => {
    if(!instructionsList || !instructionsList.length) {
      dispatch(fetchAllInstructions());
    }
  }, [instructionsList])

  return (
    <View style={styles.container}>
      <CustomText text={'Learn the basics'} fontSize={40} fontFamily={FontsEnum.SEN_BOLD} color={ColorsEnum.DARK_GREEN} style={styles.title} />
      <CustomText text={'Take a look how to cook daily in the kitchen with the most basic video instructions. Practise and become better!'} fontSize={16} fontFamily={FontsEnum.SEN_BOLD} color={ColorsEnum.DARK_GREEN} style={styles.title} />
      <FlatList
        data={instructionsList}
        scrollEnabled={true}
        renderItem={({item}): React.ReactElement => (
          <BasicsSingleInstruction instructionItem={{videoUrl: item.videoUrl, description: item.description}} />
          )}
        keyExtractor={(item): string => item.id}
        ListEmptyComponent={<CustomText fontFamily={FontsEnum.SEN_REGULAR} color={ColorsEnum.DARK_GREEN} fontSize={17} text='There are no instructions' />}
      />
    </View>
  );

}

export default BasicsScreen;
