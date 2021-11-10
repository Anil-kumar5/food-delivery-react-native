import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Home from "../home/Home";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from "react-native-reanimated";
import Svg,{Path} from "react-native-svg";
const Tab = createBottomTabNavigator();
const TabBarCustomButton = ({accessibilityState,children,onPress}) =>{
    var isSelected = accessibilityState.isSelected
    if(isSelected){
        return(
        <View style={{flex:1, alignItems:'center'}}>
            <View style={{flexDirection:'row',position:'absolute',top:0}}>
        <View style={{flex:1,backgroundColor:'white'}}></View> 
        <Svg
         width = {75}
         height = {61}
         viewBox = "0 0 75 61"
        > 
         <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
            </Svg>       
            </View>
            <TouchableOpacity
            
            style={{
                top:-22.5,
                justifyContent:'center',
                alignItems:'center',
                width: 50,
                height:50,
                borderRadius:25,
            }}
            onPress = {onPress}
            >
                {children}
            </TouchableOpacity>
        </View>
        )
    } else {
        return(
          <TouchableOpacity
          style={{
              flex:1,
              height:60,
          }}
          activeOpacity = {1}
          onPress = {onPress}
          >
             {children}
          </TouchableOpacity>
        )
    }
}
const CustomTabBar = (props) =>{
    return(
        <BottomTabBar {...props.props} />
    )
}
const BottomTab = () => {
    return (
        // dont use view here if you use here, then navigator display goes to top
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
            tabBarOptions = {{
                showLabel : false,
                style : {
                    backgroundColor:'transparent',
                    borderTopWidth:0,
                    elevation : 0,  
                }
            }}
            tabBar = {(props) => (
                <CustomTabBar
                props = {props}
                />
            )
            }          
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="utensils"
                            size={20}
                            style={{
                                color: focused && 'tomato'
                            }}
                        />
                    ),
                    tabBarButton : (props) => (
                       <TabBarCustomButton
                        {...props}
                       />
                    )
                }}
            />
            <Tab.Screen
                name="search"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="search"
                            size={20}
                            style={{
                                color: focused && 'tomato'
                            }}
                        />
                    ),
                    tabBarButton : (props) => (
                        <TabBarCustomButton
                         {...props}
                        />
                     )
                }}
            />
            <Tab.Screen
                name="liked"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="heart"
                            size={20}
                            style={{
                                color: focused && 'tomato'
                            }}
                        />
                    ),
                    tabBarButton : (props) => (
                        <TabBarCustomButton
                         {...props}
                        />
                     )
                }}
            />
            <Tab.Screen
                name="user"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="user"
                            size={20}
                            style={{
                                color: focused && 'tomato'
                            }}
                        />
                    ),
                    tabBarButton : (props) => (
                        <TabBarCustomButton
                         {...props}
                        />
                     )
                }}
            />
        </Tab.Navigator>

    )
}

export default BottomTab