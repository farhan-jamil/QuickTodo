import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { color, commonStyle, family } from '../../../utils'

export const PrimarySmallButton = ({
    title,
    onPress,
    btnContainerStyle,
    disabled
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, btnContainerStyle, disabled && { opacity: 0.4 }]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.primary50,
        ...commonStyle.ph_5,
        ...commonStyle.pv_1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: color.blac100,
        fontFamily: family.SemiBold,
        ...commonStyle.f_4
    }
})