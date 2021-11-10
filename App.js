import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTab from './components/bottomTab/BottomTab';
import Tabs from './components/bottomtabnav/TabNavigation';
import Delivery from './components/delivery/Delivery';
import Mapsss from './components/googlemaps/Mapsss';
import Home from './components/home/Home';
import Resturant from './components/resturant/Resturant';

const Stack = createStackNavigator();
const App = () =>  {
  return (
    <>
  <NavigationContainer>
<Stack.Navigator
screenOptions = {{
  headerShown : false
}}
initialRouteName = {"home"}
>
  <Stack.Screen name="home" component={Tabs}/>
  <Stack.Screen name = "restaurant" component={Resturant}/>
  <Stack.Screen name = "delivery" component = {Delivery}/>
</Stack.Navigator>
  </NavigationContainer>
  {/* <Mapsss/> */}
    </>
  );
};
export default App;
