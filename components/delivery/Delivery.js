import React, { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { COLORS, GOOGLE_API_KEY, icons } from '../../constants';
const Delivery = ({ route, navigation }) => {
    const [restaurant, setRestaurant] = useState(null);
    const [streetName, setStreetName] = useState('');
    const [fromLocation , setFromLocation] = useState(null);
    const [toLocation,setToLocation] = useState(null);
    const [region,setRegion] = useState(null);
    useEffect ( () => {
        const {restaurant,currentLocation} = route.params;
       let fromLoc = currentLocation.gps;
       let toLoc = restaurant.location;
       let street = currentLocation.streetName
       let mapRegion = {
           latitude : (fromLoc.latitude+toLoc.latitude) / 2,
           longitude : (fromLoc.longitude+toLoc.longitude)/2,
           latitudeDelta : Math.abs(fromLoc.latitude-toLoc.latitude) * 2,
           longitudeDelta : Math.abs(fromLoc.longitude-toLoc.longitude) * 2
       }
       setRestaurant(restaurant)
       setStreetName(street)
       setFromLocation(fromLoc)
       setToLocation(toLoc)
       setRegion(mapRegion)
    },[]);
    // console.warn(restaurant)
    const destinationMarker = () => (
      
        <Marker
        coordinate = {toLocation}
        >
        {/* <View
        style = {{
            height:40,
            width:40,
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:COLORS.white
        }}
        > */}
            {/* <View
            style = {{
                height:30,
                width:30,
                borderRadius:15,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:COLORS.primary
            }}
            > */}
            <Image
            source = {icons.pin}
            style={{width:25,height:25,tintColor:COLORS.primary}}
            />
            {/* </View> */}
            {/* </View>    */}
        </Marker>
    );
    const carIcon = () => (
        <Marker
        coordinate = {fromLocation}
        anchor = {{x:0.5,y:0.5}}
        flat = {true}
        >
      <Image source = {icons.car} style={{width:30,height:30}}/>
        </Marker>
    )
    return (
        <View style={{ flex: 1 }}>
            {console.log(region)}
            <View style={{ flex: 1 }}>
                {
                 region != null &&
                <MapView
                     provider = {PROVIDER_GOOGLE}
                     initialRegion = {region}
                    // region = {{
                    //     latitude:1.542194886879828,
                    //     longitude:110.36007037139458,
                    //     latitudeDelta: 2.0149332124904804,
                    //     longitudeDelta:2.007496595609254
                    // }}
                    style={{ flex: 1 }}
                >
                    <MapViewDirections
                      origin = {fromLocation}
                      destination = {toLocation}
                      apikey = {GOOGLE_API_KEY}
                      strokeWidth = {5}
                      strokeColor = {COLORS.primary}
                      optimizeWaypoints = {true}
                      onReady = {result => {
                          result.duration
                      }}
                    />
                 {destinationMarker()}
                 {carIcon()}
                </MapView>
}
            </View>
        </View>
    )
}
export default Delivery