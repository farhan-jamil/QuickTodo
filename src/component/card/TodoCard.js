import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { color, commonStyle, family } from '../../utils'

export const TodoCard = ({
    todoItem,
    onPressStar = () => { }
}) => {
    const { index, item } = todoItem
    return (
        <View style={styles.cardContainer}>
            <View style={commonStyle.flex_1}>
                <Text style={[styles.todoTitle,
                {
                    textDecorationLine: item?.completeTodo ? 'line-through' : 'none',
                    textDecorationColor: item?.completeTodo ? color.grey400 : color.white50,
                    color: item?.completeTodo ? color.grey400 : color.white50,
                }
                ]}>{item?.todoText}</Text>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{item?.todoDate?.showDate} {item?.todoTime?.showTime && ' at ' + item?.todoTime?.showTime}</Text>
                </View>
            </View>
            <AntDesign
                name={item?.todoImp ? 'star' : 'staro'}
                size={wp(8)}
                color={item?.todoImp ? color.primary50 : color.grey400}
                onPress={() => onPressStar({
                    index,
                    item
                })}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        ...commonStyle.flex_1,
        ...commonStyle.rowStyle,
        ...commonStyle.ph_4,
        backgroundColor: color.black50,
        //   ...commonStyle.mv_2
        ...commonStyle.pv_1,
        ...commonStyle.pb_2
    },
    todoTitle: {
        color: color.white50,
        ...commonStyle.f_6,
        fontFamily: family.SemiBold
    },
    timeContainer: {
        borderWidth: 1,
        borderColor: color.grey50,
        ...commonStyle.p_2,
        ...commonStyle.ph_4,
        ...commonStyle.mt_2,
        borderRadius: 100,
        alignSelf: 'baseline'
    },
    timeText: {
        color: color.grey500,
        ...commonStyle.f_4,
        fontFamily: family.Medium
    }
})