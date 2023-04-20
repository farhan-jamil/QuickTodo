import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { color, commonStyle, family } from '../../../utils'

export const PrimaryButton = ({ title, onPress, btnContainerStyle }) => {
    return (
        <TouchableOpacity style={[styles.container,btnContainerStyle]} onPress={onPress} activeOpacity={0.8} >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.primary50,
        ...commonStyle.ph_5,
        ...commonStyle.pv_3,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: color.blac100,
        ...commonStyle.f_4,
        fontFamily:family.Title
        
    }
})