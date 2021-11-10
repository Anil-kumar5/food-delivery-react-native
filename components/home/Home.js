import React from "react";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { categoryData, restaurantData } from "./AppData";
import { COLORS, FONTS, icons, SIZES } from "../../constants";
import { NavigationContainer } from "@react-navigation/native";
const Home = ({navigation}) => {

    const [categories, setCategories] = React.useState(categoryData);
    const [selectCategory, setSelectCategory] = React.useState(null);
    const [resturant, setResturant] = React.useState(restaurantData);
    const [currentLocation,setCurrentLocation] = React.useState(initialCurrentLocation);
    const onSelectCategory = (category) => {
        // filtering
        let resturantList = restaurantData.filter(data => data.categories.includes(category.id))
        setResturant(resturantList);
        setSelectCategory(category);
    };
    // data 
    const initialCurrentLocation = {
        streetName: 'something',
        gps: {
            latitude: 1.5496614931240685,
            longitude: 110.36381866919922
        }
    }
    const renderHeader = () => {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{ width: 50, paddingLeft: 8, justifyContent: 'center' }}
                >
                    <FontAwesome5 name="search-location" size={20} />
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        width: '70%',
                        height: '100%',
                        backgroundColor: 'lightgray',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10
                    }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Location</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: 15,
                        justifyContent: 'center'
                    }}
                >
                    <FontAwesome name="shopping-bag" size={20} />
                </TouchableOpacity>
            </View>
        );
    };

    /// category data

    const CategoryData = () => {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectCategory?.id == item.id) ? COLORS.primary : 'gray',
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.white,
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>
                    <Text style={{ color: '#fff', marginTop: 10, ...FONTS.body5 }}>{item.name}</Text>
                </TouchableOpacity>
            );
        };
        return (
            <View>
                <Text style={{ ...FONTS.h1 }}>Main</Text>
                <Text style={{ ...FONTS.h1 }}>Categories</Text>
                <View>
                    <FlatList
                        data={categoryData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        // initially it is true
                        // if you give value equal to true ,then the indicator opens at the bottom
                        keyExtractor={item => `${item.id}`}
                        //the key must be string
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                    />
                </View>
            </View>
        );
    };
    const getCategoriesById = (id) => {
     let category = categories.filter(data => data.id == id)
     if(category.length>0){
         return category[0].name
     }
    }
    const renderResturantData = () => {
        const renderResturantItems = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ marginBottom: 20 }}
                    onPress = {()=>navigation.navigate('restaurant',{
                        item,
                        currentLocation
                    }
                    )
                }
                >
                    <View>
                        <Image
                            source={item.photo}
                            resizeMode='cover'
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 30
                            }}
                        />
                        <Text
                            style={{
                                backgroundColor: 'lightgray',
                                padding: 12,
                                paddingBottom: 15,
                                position: 'absolute',
                                bottom: 0,
                                borderTopRightRadius: 30,
                                borderBottomLeftRadius: 30,
                                color: '#000',
                                fontWeight: '500'
                            }}
                        >{item.duration}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={{fontSize:18,color:'#000',letterSpacing:2}}>{item.name}</Text>
                        <View
                            style={{ flexDirection: 'row',marginTop:8 }}
                        >
                            <Image source={icons.star}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor:COLORS.primary,
                                    marginRight:6
                                }}
                            />
                            <Text>{item.rating}</Text>
                            {/* <Text>{categories}</Text> */}
                            {/* <Text>{`${item.price}`}</Text> */}
                            {/* categories  */}
                            <View style={{flexDirection:'row',marginLeft:10}}>
                                {
                                    item.categories.map(categoryId =>{
                                        return(
                                            <View style={{flexDirection:'row'}} key={categoryId}>
                                                <Text style={{fontSize:14,color:'#000',marginRight:7}}>{getCategoriesById(categoryId)}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            <Text>{item.priceRating}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        };
        return (
            <FlatList
                data={resturant}
                keyExtractor={item => `${item.id}`}
                renderItem={renderResturantItems}
                //  showsVerticalScrollIndicator = {false} 
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 30,
                }}

            />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {CategoryData()}
            {renderResturantData()}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor : 'lightgray'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})
export default Home