import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PushNotification from 'react-native-push-notification';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import uuid from 'react-native-uuid';

import { PrimarySmallButton, TagButton } from '../../component';
import { color, commonStyle, family } from '../../utils';

export const CreateTodo = ({
    visible,
    onClose = () => { },
    submitTodo = () => { }
}) => {

    const inputRef = useRef();
    const [todo, setTodo] = useState('')
    const [importantTodo, setImportantTodo] = useState(false)
    const [selectedDate, setSelectedDate] = useState({
        completeDate: new Date(),
        showDate: ('Today')
    });
    const [selectedTime, setSelectedTime] = useState({
        completeTime: '',
        showTime: ''
    });

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);


    useEffect(() => {
        if (visible) {
            inputRef.current.focus()
        }
    }, [visible, inputRef]);

    const handleDateConfirm = (date) => {
        setSelectedDate({
            completeDate: date,
            showDate: moment(date).format('DD MMM'),
        });
        setDatePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        setSelectedTime({
            completeTime: time,
            showTime: moment(time).format('h:mm A'),
        });
        setTimePickerVisibility(false);
    };

    const createTodo = (uniqueId) => {
        console.log('unique Id', uniqueId)
        const newTodo = {
            key: uniqueId,
            todoDate: selectedDate,
            todoTime: selectedTime,
            todoImp: importantTodo,
            todoText: todo,
            status: moment(selectedDate?.completeDate).isSame(moment().toISOString(), 'day') ? 'Today' : 'Upcoming',
            completeTodo: false
        }
        onClose()
        submitTodo(newTodo)
    }

    const onSubmit = () => {
        const uniqueId = parseInt(uuid.v4().split('-')[0], 16).toString(10);
        const userTime = moment(selectedTime.completeTime);
        const currentDateTime = moment()
        // moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        const userDate = moment(selectedDate?.completeDate)
        // moment();

        if (selectedTime?.completeTime) {
        
            if (userDate.isSame(currentDateTime))
                if (userTime.isAfter((currentDateTime))) {

                    console.log('geerating Notfiication')

                    const notificationDate = new Date(selectedDate?.completeDate);

                    notificationDate.setHours(selectedTime?.completeTime?.getHours());
                    notificationDate.setMinutes(selectedTime?.completeTime?.getMinutes());
                    notificationDate.setSeconds(0);
                    notificationDate.setMilliseconds(0);

                    PushNotification.localNotificationSchedule({
                        id: uniqueId,
                        title: 'Quick Todo',
                        message: todo,
                        date: notificationDate,
                        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
                        channelId: "todo-alarm",
                        /* Android Only Properties */
                        repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
                        playSound: true, // (optional) default: true
                        soundName: "default",
                        vibrate: true, // (optional) default: true
                        vibration: 300,
                    })
                    createTodo(uniqueId)
                }
                else {
                    ToastAndroid.show('Select future time', ToastAndroid.SHORT);
                    return;
                }
            else {
                const notificationDate = new Date(selectedDate?.completeDate);

                notificationDate.setHours(selectedTime?.completeTime?.getHours());
                notificationDate.setMinutes(selectedTime?.completeTime?.getMinutes());
                notificationDate.setSeconds(0);
                notificationDate.setMilliseconds(0);

                PushNotification.localNotificationSchedule({
                    id: uniqueId,
                    title: 'Quick Todo',
                    message: todo,
                    date: notificationDate,
                    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
                    channelId: "todo-alarm",
                    /* Android Only Properties */
                    repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
                    playSound: true, // (optional) default: true
                    soundName: "default",
                    vibrate: true, // (optional) default: true
                    vibration: 300,
                })
                createTodo(uniqueId)

            }
        }
        else {
            console.log('User has not selected tIme but enetered the text of todo')
            createTodo(uniqueId)
        }
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.avoidingViewContainer}
            >
                <TouchableOpacity
                    style={commonStyle.flex_1}
                    onPress={onClose}
                    activeOpacity={1}>
                </TouchableOpacity>

                <View style={styles.writeTodoContainer}>
                    <View>
                        <TextInput
                            placeholder='Write your Todo'
                            placeholderTextColor={color.grey500}
                            value={todo}
                            onChangeText={(val) => setTodo(val)}
                            style={styles.inputStyle}
                            multiline={true}
                            ref={inputRef}
                            // onLayout={() => inputRef.current.focus()}
                            autoFocus={visible}
                        // blurOnSubmit={true}
                        />
                        <View style={styles.btnsRowContainer}>
                            <TagButton
                                title={selectedDate?.showDate}
                                onPress={() => setDatePickerVisibility(true)}
                                Icon={Feather}
                                iconName={'calendar'}
                            />
                            <View style={commonStyle.pl_3} />
                            <TagButton
                                title={selectedTime?.showTime}
                                onPress={() => setTimePickerVisibility(true)}
                                Icon={AntDesign}
                                iconName={'clockcircleo'}
                            />
                            <View style={commonStyle.pl_2} />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setImportantTodo(!importantTodo)}>
                                <AntDesign
                                    name={importantTodo ? 'star' : 'staro'}
                                    color={importantTodo ? color.primary50 : color.white50}
                                    size={wp(5)}
                                />
                            </TouchableOpacity>
                            <View style={styles.saveBtnContainer}>
                                <PrimarySmallButton
                                    title={'Save'}
                                    onPress={() => onSubmit()}
                                    disabled={!todo}
                                />
                            </View>
                        </View>

                    </View>

                </View>
            </KeyboardAvoidingView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                minimumDate={new Date()}

            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={() => setTimePickerVisibility(false)}
            />
        </Modal>
    )
}
const styles = StyleSheet.create({
    avoidingViewContainer: {
        ...commonStyle.flex_1,
        justifyContent: 'flex-end'
    },
    writeTodoContainer: {
        backgroundColor: color.grey200,
        ...commonStyle.pb_2,
        ...commonStyle.ph_2
    },
    inputStyle: {
        color: color.white50,
        ...commonStyle.f_5,
        lineHeight: 30,
        fontFamily: family.Medium,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: Platform.OS === 'ios' ? hp(20) : hp(18),
    },
    btnsRowContainer: {
        ...commonStyle.rowStyle,
        ...commonStyle.pt_1,
        width: '100%',
    },
    saveBtnContainer: {
        flex: 1,
        alignSelf: 'baseline',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
})
