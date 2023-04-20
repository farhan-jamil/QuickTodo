import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { QuickTodo } from './src/navigation';
import PushNotification, { Importance } from 'react-native-push-notification';

export default function App() {

    React.useEffect(() => {


        if (Platform.OS === 'android') {
            PushNotification.createChannel(
                {
                    channelId: "todo-alarm", // (required)
                    channelName: "Reminder", // (required)
                    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                    playSound: true, // (optional) default: true
                    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
                },
                (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
            );
        }

        setTimeout(() => {
            SplashScreen.hide();
        }, 3000)

    }, [])

    return (
        <QuickTodo />
    )
}


const styles = StyleSheet.create({
    screenContainer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'center',
    },
    stretchContainer: {
        alignSelf: 'stretch',
        flex: 1,
    },
})
