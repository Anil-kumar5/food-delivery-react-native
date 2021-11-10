import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
const Mapsss = () => {
    // const [lat,setLat] = React.useState(null);
    // const[long,setLong] = React.useState(null);
    // const onGetMyLocation = () => {
    //     Geolocation.getCurrentPosition(position =>{
    //         setLat(position.coords.latitude)
    //         setLong(position.coords.longitude)
    //     })
    // };
    // console.warn(lat)
    // console.warn(long)
    Geolocation.getCurrentPosition(position => {
        console.warn(position.coords.latitude)
    })
    // navigator.geolocation.getCurrentPosition(position =>console.warn(position.coords.latitude))
    return(
        <>
        <View>
            <MapView
            style={{height:'60%'}}
            region = {{
                latitude:17.440081,
                longitude:78.348915,
                latitudeDelta:0.015,
                longitudeDelta:0.0121
            }}
            >
            </MapView>
            {/* <TouchableOpacity onPress={()=>onGetMyLocation()}><Text>get</Text></TouchableOpacity> */}
        </View>
        {/* <Text>{lat}---{long}</Text> */}
        </>
    )
}

export default Mapsss