import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { widthPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SwipeListView } from 'react-native-swipe-list-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { color, commonStyle, family, imagepath } from '../../utils';
import { TodoCard } from '../card';

export const SwipeList = ({
    swipeListData,
    onPressStar = () => { },
    deleteTodo = () => { },
    completeTodo = () => { }
}) => {

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, data) => {
        console.log('data', data.item.key)
        closeRow(rowMap, data?.item?.key);
        deleteTodo(data)
        PushNotification.cancelLocalNotification(data?.item?.key);
    };

    const completeRow = (rowMap, data) => {
        closeRow(rowMap, data?.item?.key);
        completeTodo(data)

    };

    // const onRowDidOpen = rowKey => {
    //     console.log('This row opened', rowKey);
    // };

    const renderItem = data => {
        return (
            <TodoCard
                todoItem={data}
                onPressStar={onPressStar}
            />
        )
    }

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity style={{ ...styles.backLeftBtn, ...styles.backLeftBtnLeft }}
                onPress={() => completeRow(rowMap, data)}>

                <AntDesign name='check' size={wp(8)} color={color.blac100} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => deleteRow(rowMap, data)}
            >
                <Feather name='trash' size={wp(8)} color={color.blac100} />
            </TouchableOpacity>
        </View>
    );

    const itemSeparatorComponent = () => {
        return (
            <View style={styles.itemSeparator} />
        )
    }

    const ListEmptyComponent = () => {
        return (

            <View style={[commonStyle.flex_1, { alignItems: 'center', justifyContent: 'center', paddingHorizontal: widthPercentageToDP(10) }]}>
                <View>
                    <Image style={{ width: 188, height: 174, ...commonStyle.mb_6 }} source={imagepath.list} resizeMode='cover' />
                </View>
                <Text style={{
                    color: color.white50,
                    fontFamily: family.SemiBold,
                    ...commonStyle.f_6

                }}>You're all caught up</Text>
                <Text style={{
                    ...commonStyle.f_4,
                    fontFamily: family.Regular,
                    color: color.grey600,
                    textAlign: 'center',
                    ...commonStyle.mt_2
                }}>Tap the + button to add a todo and keep track of your day</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SwipeListView
                data={swipeListData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={wp(18)}
                rightOpenValue={-wp(18)}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                // onRowDidOpen={onRowDidOpen}
                style={styles.listStyle}
                ItemSeparatorComponent={itemSeparatorComponent}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={ListEmptyComponent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowBack: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%',
        backgroundColor: color.black50
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: wp(18),
    },
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: wp(18),
    },
    backLeftBtnLeft: {
        backgroundColor: color.primary50,
        left: 0,
    },

    backRightBtnRight: {
        backgroundColor: color.red50,
        right: 0,
    },

    listStyle: {
        flex: 1,
        backgroundColor: color.black50
    },
    itemSeparator: {
        height: 2,
        backgroundColor: color.grey200,

    },
    contentContainer: {
        ...commonStyle.pb_3,
        ...commonStyle.pt_3,
        flexGrow: 1,
    }
});
