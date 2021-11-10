import React from 'react';
import { Alert, Animated, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';

const Resturant = ({ route, navigation }) => {
    const scrollX = new Animated.Value(0);
    const initialCurrentLocation = {
        streetName: "Kuching",
        gps: {
            latitude: 1.5496614931250685,
            longitude: 110.36381866919922
        }
    }
    const { item } = route.params;
    const [restaurant, setRestaurant] = React.useState(item);
    // const [location, setLocation] = React.useState(initialCurrentLocation);
    const [orderItem, setOrderItem] = React.useState([]);
    // React.useEffect(() => {
    //     const { item, currentLocation } = route.params;
    //     setRestaurant(item)
    //     setLocation(currentLocation)
    // }, []);
    const editOrder = (action, menuId, price) => {
        if (action === '+') {
            let orderList = orderItem.slice();
            let item = orderList.filter(data => data.menuId == menuId)
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty + price

            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }
            setOrderItem(orderList)
        } else {

        }
    }
    const getOrderQty = menuId => {
        let item = orderItem.filter(data => data.menuId ==menuId)
        if(item.length>0){
            return orderItem[0].qty
        }
        return 0
    }
    const navToDelivery = () => {
        if(orderItem.length>0){
            navigation.navigate('delivery',
                {
                    restaurant : restaurant,
                    currentLocation : initialCurrentLocation
                }
            )
        }else{
            Alert.alert('you have zero items in the cart to proceed')
        }
    }
    const resturantHeader = () => {
        return (

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        width: 50,
                        paddingLeft: 20,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.back}
                        resizeMode='contain'
                        style={{
                            width: 30,
                            height: 30
                        }}

                    />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 30,
                        borderRadius: SIZES.radius,
                        backgroundColor: 'gray'
                    }}>
                        <Text style={{ ...FONTS.h3 }}>{restaurant.name}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: 50,
                        justifyContent: 'center',
                    }}
                >
                    <Image source={icons.list} resizeMode="contain" style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </View>

        );
    };
    const resturantMenu = () => {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={
                    Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ], { useNativeDriver: false })
                }
                style={{ marginTop: 20 }}
            >
                {
                    restaurant?.menu.map((item, index) => {
                        return (
                            <View
                                key={`menu-${index}`}
                                style={{ alignItems: 'center' }}
                            >
                                <View style={{
                                    height: SIZES.height * 0.35
                                }}>
                                    <Image
                                        source={item.photo}
                                        resizeMode="cover"
                                        style={{
                                            width: SIZES.width,
                                            height: '100%'
                                        }}
                                    />
                                    <View style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',

                                    }}>
                                        <View style={{
                                            position: 'absolute',
                                            bottom: -15,
                                            backgroundColor: 'white',
                                            flexDirection: 'row',
                                            height: 30,
                                            borderRadius: 30,
                                            paddingHorizontal: 18,
                                            alignItems: 'center',

                                        }}>
                                            <TouchableOpacity
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        color: '#000',
                                                        fontWeight: 'bold'
                                                    }}>
                                                    -</Text>
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    paddingHorizontal: 18,
                                                    color: '#000',
                                                    fontWeight: '700'
                                                }}>
                                                    {getOrderQty(item.menuId)}
                                                    </Text>
                                            <TouchableOpacity
                                                onPress={() => editOrder('+', item.menuId, item.price)}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        color: '#000',
                                                        fontWeight: 'bold'
                                                    }}>
                                                    +</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 14 }}>
                                        <Text style={{ fontSize: 16, color: '#000', fontWeight: '600' }}>{item.name} - {`${item.price}.00`}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}><Text style={{}}>{item.description}</Text></View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                                        <Image source={icons.fire} style={{ width: 20, height: 20 }} />
                                        <Text style={{ marginLeft: 10 }}>{`${item.calories.toFixed(2)} cal`}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
                {/* {console.warn(restaurant.menu)} */}
            </Animated.ScrollView>
        );
    };
    const dotsPagination = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width);
        return (
            <View style={{ height: 30 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 10
                }}>
                    {
                        restaurant?.menu.map((item, index) => {
                            const opacity = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: 'clamp'
                            });
                            const dotSize = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                                extrapolate: 'clamp'
                            });
                            const dotColor = dotPosition.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                                extrapolate: 'clamp'
                            });
                            return (
                                <Animated.View
                                    key={`dot-${index}`}
                                    opacity={opacity}
                                    style={{
                                        borderRadius: SIZES.radius,
                                        marginHorizontal: 6,
                                        width: dotSize,
                                        height: dotSize,
                                        backgroundColor: dotColor
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    const renderOrder = () => {
        return (
            <View>
                {dotsPagination()}
                <View
                    style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1,
                        }}>
                        <Text style={{ ...FONTS.h3, color: '#000' }}>Items in cart</Text>
                        <Text style={{ ...FONTS.h3, color: '#000' }}>$50</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: SIZES.padding * 2,
                        paddingHorizontal: SIZES.padding * 3,
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.pin}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ marginLeft: 10, ...FONTS.h4, color: '#000' }}>Location</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <Image
                                source={icons.master_card}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ marginLeft: 10 }}>8899</Text>
                        </View>
                    </View>
                    {/* for button  */}
                    <View
                        style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            padding: 20
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: 30,
                                padding: 10,
                                //   width : SIZES.width*0.9
                            }}
                            onPress = {
                               ()=> navToDelivery()
                            }
                        >
                            <Text
                                style={{ color: 'white', ...FONTS.h4 }}
                            >order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text>❤😎😎😎😉😉</Text>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            {resturantHeader()}
            {resturantMenu()}
            {renderOrder()}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2,
    }
})
export default Resturant