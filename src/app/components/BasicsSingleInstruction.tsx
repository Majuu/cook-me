import { FunctionComponent, ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import { ColorsEnum } from '../enums/colors.enum';
import { FontsEnum } from '../enums/fonts.enum';
import CustomText from './shared/CustomText';

interface BasicsSingleInstructionProps {
  instructionItem: { videoUrl: string; description: string };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: ColorsEnum.DARK_GREEN,
  },
  video: {
    width: '100%',
    height: 200,
  },
  description: {
    marginBottom: 15,
  },
});

const BasicsSingleInstruction: FunctionComponent<
  BasicsSingleInstructionProps
> = ({ instructionItem }): ReactElement => {
  const { description, videoUrl } = instructionItem;

  // A dummy function to properly load different videos (react-native-video crashes the app if the video uri is passed dynamically)
  const dummyGenerateVideoSource = (): any => {
    if (videoUrl.includes('wok')) {
      return require('../../../assets/videos/wok.mp4');
    } else if (videoUrl.includes('corn')) {
      return require('../../../assets/videos/corn.mp4');
    } else if (videoUrl.includes('chopping')) {
      return require('../../../assets/videos/chopping.mp4');
    } else if (videoUrl.includes('mango')) {
      return require('../../../assets/videos/mango.mp4');
    } else if (videoUrl.includes('sauce')) {
      return require('../../../assets/videos/sauce.mp4');
    } else if (videoUrl.includes('frying')) {
      return require('../../../assets/videos/frying.mp4');
    } else if (videoUrl.includes('knife')) {
      return require('../../../assets/videos/knife.mp4');
    }
  };

  return (
    <View style={styles.container}>
      <CustomText
        style={styles.description}
        text={description}
        fontSize={17}
        fontFamily={FontsEnum.SEN_REGULAR}
        color={ColorsEnum.DARK_GREEN}
      />
      <Video
        style={styles.video}
        source={dummyGenerateVideoSource()}
        paused={true}
        controls={true}
      />
    </View>
  );
};

export default BasicsSingleInstruction;
