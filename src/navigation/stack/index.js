import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Home, Landing } from '../../screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';
import { color, commonStyle } from '../../utils';

const Stack = createStackNavigator();

export const AppStack = () => {
    const [showLanding, setShowLanding] = useState(true);

    // // check if landing screen has been shown before
    // useEffect(() => {
    //     AsyncStorage.getItem('hasShownLanding').then((value) => {
    //         if (!value) {
    //             setShowLanding(true);
    //             AsyncStorage.setItem('hasShownLanding', 'true');
    //         }
    //     });
    // }, []);

    useEffect(() => {
        AsyncStorage.getItem('hasShownLanding').then((value) => {
            setShowLanding(value);
        });
    }, []);


    async function handleLandingScreenButtonPress(navigation) {
        console.log('Hello')
        // await AsyncStorage.setItem('showLandingScreen', 'false');
        // setShowLandingScreen(false);
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'Home' }],
        // });
    }

    // if (!showLanding) {
    //     return (
    //         <View style={[commonStyle.flex_1, commonStyle.center]}>
    //             <ActivityIndicator
    //                 animating={true}
    //                 color={color.red50}
    //                 size="large"
    //             />
    //         </View>
    //     );
    // }

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {/* {
                showLanding ? */}
            <Stack.Screen name="Landing" component={Landing}
            />
            {/* : */}

            <Stack.Screen name="Home" component={Home} />
            {/* } */}
        </Stack.Navigator>
    )
}
