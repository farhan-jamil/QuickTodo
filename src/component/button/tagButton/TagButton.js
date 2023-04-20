import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { color, commonStyle, family } from '../../../utils'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const TagButton = ({
    title,
    onPress,
    Icon,
    iconName,
}) => {

    return (
        <TouchableOpacity style={[styles.container,
        !!title && { backgroundColor: color.grey100, }
        ]}
            activeOpacity={0.8}
            onPress={onPress}
        >
            {
                Icon &&
                <Icon name={iconName} size={wp(5)} color={color.white50} />
            }
            {
                title &&
                <Text style={styles.title}>{title}</Text>
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        ...commonStyle.ph_2,
        ...commonStyle.pv_1

    },
    title: {
        color: color.white50,
        ...commonStyle.pl_2,
        ...commonStyle.f_4,
        fontFamily: family.Medium
    }
})