// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * Generated with the TypeScript template
//  * https://github.com/react-native-community/react-native-template-typescript
//  *
//  * @format
//  */

// import React, {type PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section: React.FC<
//   PropsWithChildren<{
//     title: string;
//   }>
// > = ({children, title}) => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
import React, {
  Component,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import MenuScreen from './src/app/screens/MenuScreen';
import IntroScreen from './src/app/screens/IntroScreen';
import RecipeListScreen from './src/app/screens/RecipesScreen';
import LearnBasicsScreen from './src/app/screens/BasicsScreen';
import {ScreensEnum} from './src/app/enums/screens.enum';
import AddRecipeScreen from './src/app/screens/AddRecipeScreen';
import FullScreenContainer from './src/app/components/FullScreenContainer';
import RecipeDeailsScreen from './src/app/screens/RecipeDetailsScreen';
import { Provider } from 'react-redux';
import { store } from './src/app/store/store';

interface StackedScreensInterface {
  name: ScreensEnum;
  component: FunctionComponent<any>;
}

const Stack = createStackNavigator();

class App extends Component {
  private stackScreens: StackedScreensInterface[] = [
    {name: ScreensEnum.INTRO, component: IntroScreen},
    {name: ScreensEnum.MENU, component: MenuScreen},
    {name: ScreensEnum.RECIPE_LIST, component: RecipeListScreen},
    {name: ScreensEnum.MY_RECIPES, component: RecipeListScreen},
    {name: ScreensEnum.LEARN_BASICS, component: LearnBasicsScreen},
    {name: ScreensEnum.ADD_RECIPE, component: AddRecipeScreen},
    {name: ScreensEnum.RECIPE_DETAILS, component: RecipeDeailsScreen},
  ];

  public render(): ReactNode {
    return (
      <Provider store={store}>
        <NavigationContainer>
            <FullScreenContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {this.stackScreens.map(
              (item: StackedScreensInterface): ReactElement => (
                <Stack.Screen
                  key={item.name}
                  name={item.name}
                  component={item.component}
                />
              )
            )}
          </Stack.Navigator>
                </FullScreenContainer>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
