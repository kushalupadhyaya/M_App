import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from './AuthContext';

import MyTabs from './screens/MyTabs'; 
import WelcomeScreen from './screens/WelcomeScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import SignInScreen from './screens/SignInScreen';
import MentalHealthScreen from './screens/MentalHealthScreen';
import SpiritualScreen from './screens/SpiritualScreen';
import LoveScreen from './screens/LoveScreen';
import IQScreen from './screens/IQScreen';
import WorkBusinessScreen from './screens/WorkBusinessScreen';
import ProductivityScreen from './screens/ProductivityScreen';
import FitnessAndSportScreen from './screens/FitnessAndSportScreen';
import FreeSelectionScreen from './screens/FreeSelectionScreen';
import MainPageScreen from './screens/MainPageScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import FreeScreen from './screens/FreeScreen';
import SettingsScreen from './screens/SettingsScreen';



const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AppStack.Navigator initialRouteName="Main">
          <AppStack.Screen name="Main" component={MyTabs} options={{ headerShown: false }}/>
          <AppStack.Screen name="MentalHealth" component={MentalHealthScreen} />
          <AppStack.Screen name="Spiritual" component={SpiritualScreen} />
          <AppStack.Screen name="Love" component={LoveScreen} />
          <AppStack.Screen name="IQ" component={IQScreen} />
          <AppStack.Screen name="WorkBusiness" component={WorkBusinessScreen} />
          <AppStack.Screen name="Productivity" component={ProductivityScreen} />
          <AppStack.Screen name="FitnessAndSport" component={FitnessAndSportScreen} />
          <AppStack.Screen name="Subscription" component={SubscriptionScreen} />
          <AppStack.Screen name="FreeSelection" component={FreeSelectionScreen} />
          <AppStack.Screen name="Settings" component={SettingsScreen} />

        </AppStack.Navigator>
      ) : (
        <AuthStack.Navigator initialRouteName="Welcome">
          <AuthStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <AuthStack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
          <AuthStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
          <AppStack.Screen name="FreeSelection" component={FreeSelectionScreen} options={{ headerShown: false }} />
          <AppStack.Screen name="FreeScreen" component={FreeScreen} options={{ headerShown: false }} />
          <AppStack.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppNavigator;
